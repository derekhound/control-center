var fs = require('fs');
var _ = require('lodash');

function loadConfigFile(api, filepath)
{
  // env
  var env = api.env;

  // get basename
  var name = require('path').basename(filepath, '.js');

  // setup api.config[name]
  api.config[name] = api.config[name] || {};

  // load config
  var config = require(filepath);

  // merge different env setting
  if (config[env]) {
    _.extend(api.config[name], config['default'], config[env]);
  } else {
    _.extend(api.config[name], config['default']);
  }
}

function loadConfigDir(api, dirpath)
{
  fs.readdirSync(dirpath).forEach(function (filename) {
    var filepath = dirpath + '/' + filename;
    loadConfigFile(api, filepath);
  });
}

module.exports = function(api, options) {
  // setup api.config
  api.config = {};

  // config paths
  var paths = [];

  // system config dir
  paths.push(__dirname + '/../config');

  // app config path
  if (_.isString(options.configPath)) {
    paths.push(options.configPath);
  } else if (_.isArray(options.configPath)) {
    _.forEach(options.configPath, function(path) {
      paths.push(path);
    });
  }

  // load config
  _.forEach(paths, function(path) {
    if (fs.statSync(path).isDirectory()) {
      loadConfigDir(api, path);
    } else {
      loadConfigFile(api, path);
    }
  });
};

