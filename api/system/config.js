var fs = require('fs');
var _ = require('lodash');

module.exports = function(api) {

  // setup api.config
  api.config = {};

  // env
  var env = api.env;

  // config dir
  var dir = __dirname + '/../config';

  // add config to api.config
  fs.readdirSync(dir).forEach(function (file) {
    // get basename
    var name = file.substr(0, file.lastIndexOf('.'));

    // load config
    var config = require(dir + '/' + file);

    // merge different env setting
    if (config[env]) {
      api.config[name] =_.extend({}, config['default'], config[env]);
    } else {
      api.config[name] =_.extend({}, config['default']);
    }
  });
};

