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
  api.container.load(appDir + '/lib/helper');
  api.container.load(appDir + '/lib/resource');

  // register service
  var serviceDir = appDir + '/lib/service';
  fs.readdirSync(serviceDir).forEach(function (file) {
    api.container.register(file, require(serviceDir + '/' + file));
  });

  // register app/route
  api.container.load(appDir + '/route');

};

