module.exports = function(func) {

  // setup api
  var api = {};

  // setup env
  api.env = process.env.NODE_ENV || 'development';

  // setup config
  require('./config')(api);

  // setup dependent injection
  require('./dependable')(api);

  // setup logger
  require('./logger')(api);

  // resolve func
  if (func) {
    api.container.resolve(func);
  }

  return api;
};

