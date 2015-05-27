/**
 *
 * @param {object} opions
 * @param {string} opions.appName
 * @param {string|string[]} opions.configPath - an extra config dir or config file
 *
 */

module.exports = function(options) {

  // default values
  options = options || {};

  // setup api
  var api = {};

  // setup env
  api.env = process.env.NODE_ENV || 'development';

  // setup config
  require('./config')(api, options);

  // setup dependent injection
  require('./dependable')(api, options);

  // setup logger
  require('./logger')(api, options);

  return api;
};

