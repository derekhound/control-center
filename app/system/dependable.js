var dependable = require('dependable');
var fs = require('fs');

module.exports = function(api, options) {

  // app dir
  var appDir = api.config.general.paths.app;

  // add container to api
  api.container = dependable.container();

  // register api
  api.container.register('api', api);

  // register app/lib
  api.container.load(appDir + '/lib/resource');

};

