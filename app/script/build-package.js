#!/usr/bin/node

var exec    = require('child_process').exec;
var fs      = require('fs');
var _       = require('lodash');
var Promise = require('bluebird');
var sprintf = require('sprintf');

function usage()
{
  var doc = [
    'Usage',
    '    build-package [options]',
    '',
    'Options',
    '    -h',
    '        this help page',
    '    -p path',
    '        a package path',
    '    -c',
    '        clean temporary files after finishing tasks',
    '',
    'Examples',
    '    build-package -n dispatcher',
    '    build-package -p /home/ubuntu/srchub/DDADBackend/backend/dispatcher',
    ''
  ].join('\n');

  console.log(doc);
}

function getOpts()
{
  var opts = require('minimist')(process.argv.slice(2));

  if (opts.h) {
    usage();
    process.exit(0);
  }

  if (opts.p === undefined) {
    usage();
    process.exit(1);
  }

  return opts;
}

function getConfig(buildDir)
{
  // check exist
  var configPath = buildDir + '/config.json';
  if (!fs.existsSync(configPath)) {
    api.logger.error('config.json is lost');
    return false;
  }

  // load config
  var config = require(configPath);

  // check format
  if (config.name === undefined) {
    api.logger.error('missing name property');
    return false;
  }
  if (config.version === undefined) {
    api.logger.error('missing version property');
    return false;
  }
  if (config.scripts === undefined) {
    api.logger.error('missing scripts property');
    return false;
  }
  if (config.scripts.build === undefined) {
    api.logger.error('missing scripts.build property');
    return false;
  }
  if (config.scripts.install === undefined) {
    api.logger.error('missing scripts.install property');
    return false;
  }
  if (config.tarball === undefined) {
    api.logger.error('missing tarball property');
    return false;
  }

  // check scripts exist
  if (!fs.existsSync(buildDir + '/' + config.scripts.build)) {
    api.logger.error('%s is lost', config.scripts.build);
    return false;
  }
  if (!fs.existsSync(buildDir + '/' + config.scripts.install)) {
    api.logger.error('%s is lost', config.scripts.install);
    return false;
  }

  return config;
}

function execCommand(api, cmd, cwd)
{
  return new Promise(function(resolve, reject) {

    var child = exec(cmd, {cwd: cwd}, function(err, stdout, stderr) {
      if (err) {
        return reject(err);
      }

      if (stdout) {
        api.logger.info(stdout.trim());
      }
      if (stderr) {
        api.logger.info(stderr.trim());
      }
      return resolve();
    });

  });
}

function uploadS3(api, S3, packageName, tarballName, tarballDest)
{
  return new Promise(function(resolve, reject) {

    // read file content
    fs.readFile(tarballDest, function(err, data) {
      if (err) { return reject(err); }

      // bucket & key
      var bucket = api.config.aws.s3.data_bucket;
      var key = sprintf('packages/%s/%s', packageName, tarballName);
      var url = sprintf('%s/%s/%s', api.config.aws.s3.host, bucket, key);

      // params
      var params = {
        Bucket      : bucket,
        Key         : key,
        Body        : data,
        ContentType : 'application/binary',
        ACL         : 'private',
        StorageClass: 'STANDARD',
        CacheControl: 'max-age=86400',
      };

      // upload file to s3
      S3.putObject(params, function(err, data) {
        if (err) { return reject(err); }

        var url = sprintf('%s/%s/%s', api.config.aws.s3.host, bucket, key);
        return resolve(url);
      });
    });

  });
}

function updateRDS(api, Sequelize, packageDir, packageConfig, url)
{
  var Package         = api.model.rds.Package;
  var PackageVersion  = api.model.rds.PackageVersion;

  var package_id;

  // get package
  return Package.findOne({
    where: {
      name: packageConfig.name,
      path: packageDir
    }
  })
  // update package
  .then(function(row) {
    if (row === null) {
      throw new Error('This package is not registered');
    }
    package_id = row.package_id;

    // update package
    return Package.update({
      latest: packageConfig.version
    }, {
      where: {
        package_id: package_id
      }
    });
  })
  // update package version
  .then(function() {
    return PackageVersion.upsert({
      package_id: package_id,
      version: packageConfig.version,
      dependencies: packageConfig.dependencies,
      url: url
    }, {
      where: {
        package_id: package_id,
        version: packageConfig.version
      }
    });
  });
}

function run(api, Sequelize, S3)
{
  // get options
  var opts = getOpts();

  // dir
  var packageDir = opts.p;
  var buildDir = packageDir + '/build';

  // log
  api.logger.info('process %s', packageDir);

  // config file
  var packageConfig = getConfig(buildDir);
  if (packageConfig === false) {
    process.exit(1);
  }

  // tarball
  var tarballName = sprintf('%s-%s.tar.gz', packageConfig.name, packageConfig.version);
  var tarballSrc  = buildDir + '/' + packageConfig.tarball;
  var tarballDest = packageDir + '/' + tarballName;

  return Promise.resolve()
  // git pull
  .then(function() {
    var cmd = 'git pull';
    var cwd = packageDir;
    return execCommand(api, cmd, cwd);
  })
  // build clean
  .then(function() {
    var cmd = sprintf('%s clean', packageConfig.scripts.build);
    var cwd = buildDir;
    return execCommand(api, cmd, cwd);
  })
  // build make
  .then(function() {
    var cmd = sprintf('%s make', packageConfig.scripts.build);
    var cwd = buildDir;
    return execCommand(api, cmd, cwd);
  })
  // build install
  .then(function() {
    var cmd = sprintf('%s install', packageConfig.scripts.build);
    var cwd = buildDir;
    return execCommand(api, cmd, cwd);
  })
  // tarball package
  .then(function() {
    var cmd = sprintf('tar -czvf %s -C %s .', tarballDest, tarballSrc);
    var cwd = packageDir;
    return execCommand(api, cmd, cwd);
  })
  // upload s3
  .then(_.partial(uploadS3, api, S3, packageConfig.name, tarballName, tarballDest))

  // update rds
  .then(_.partial(updateRDS, api, Sequelize, packageDir, packageConfig))

  // clean
  .then(function() {
    if (opts.c) {
      var cmd = [
        'rm -rf ' + tarballSrc,
        'rm -rf ' + tarballDest
      ].join(';');
      var cwd = packageDir;
      return execCommand(api, cmd, cwd);
    }
  })
  // success
  .then(function() {
    process.exit(0);
  })
  // fail
  .catch(function(err) {
    api.logger.error(err.message);
    process.exit(1);
  })
}


//------------------------------
// setup system
//------------------------------
(function() {
  var api = require('../system')({
    appName: 'build-package'
  });
  api.container.resolve(run);
})();

