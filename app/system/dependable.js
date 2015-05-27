var dependable = require('dependable');
var fs = require('fs');

module.exports = function(api, options) {

  // lib dir
  var libDir = api.config.general.paths.lib;

  // add container to api
  api.container = dependable.container();

  // register api
  api.container.register('api', api);

  // register lib
  api.container.load(libDir + '/resource');

};

