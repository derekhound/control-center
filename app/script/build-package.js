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
    '    -n name',
    '        a package name',
    '    -p path',
    '        a package path',
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

  if (opts.n === undefined && opts.p === undefined) {
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

function execCommand(cmd, cwd)
{
  return new Promise(function(resolve, reject) {

    var child = exec(cmd, {cwd: cwd}, function(err, stdout, stderr) {
      if (err) {
        api.logger.error(err.message);
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

function run(api, Sequelize)
{
  // get options
  var opts = getOpts();

  // find package path from db
  if (opts.n) {
    opts.p = 'TODO';
  }

  // dir
  var packageDir = opts.p;
  var buildDir = packageDir + '/build';

  // log
  api.logger.info('process %s', packageDir);

  // config file
  var config = getConfig(buildDir);
  if (config === false) {
    process.exit(1);
  }

  return Promise.resolve()
  // build clean
  .then(function() {
    var cmd = sprintf('%s clean', config.scripts.build);
    var cwd = buildDir;
    return execCommand(cmd, cwd);
  })
  // build make
  .then(function() {
    var cmd = sprintf('%s make', config.scripts.build);
    var cwd = buildDir;
    return execCommand(cmd, cwd);
  })
  // build install
  .then(function() {
    var cmd = sprintf('%s install', config.scripts.build);
    var cwd = buildDir;
    return execCommand(cmd, cwd);
  })
  // success
  .then(function() {
    process.exit(0);
  })
  // fail
  .catch(function(err) {
    process.exit(1);
  })
}


//------------------------------
// setup system
//------------------------------
var api = require('../system')({
  appName: 'build-package'
});
api.container.resolve(run);

