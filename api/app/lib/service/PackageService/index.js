var _             = require('lodash');
var Promise       = require('bluebird');
var fs            = require('fs');
var exec          = require('child_process').exec;
var sprintf       = require('sprintf');

module.exports = function(api, Sequelize) {

  var Package = api.model.rds.Package;

  /**
   * Query packages
   *
   * @promise {package[]} - An array of package objects
   */
  function queryPackages(product_id)
  {
    var conditions = [];
    var conditions_str = '';

    if (product_id) {
      conditions.push('p.product_id = ' + product_id);
    }
    if (conditions.length > 0) {
      conditions_str = 'WHERE ' + conditions.join(' AND ');
    }

    var sql = [
      'SELECT',
        'pkg.*,',
        'p.name AS product_name',
      'FROM',
        'package AS pkg',
      'JOIN',
        'product as p ON pkg.product_id = p.product_id',
      conditions_str,
      'ORDER BY',
        'p.name ASC,',
        'pkg.name ASC'
    ].join(' ');

    return Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});

  }

  /**
   * Create a package
   *
   * @param {string} name
   * @param {string} path - The source code path of this package
   * @promise {package} - A package model instance
   */
  function createPackage(product_id, name, path)
  {
    // get package
    return Package.findOne({
      where: {
        product_id: product_id,
        name: name
      }
    }, {raw: true})
    .then(function(row) {
      // package exists
      if (row) {
        throw new Error('This package name has been used');
      }

      // check path exist
      if (!fs.existsSync(path)) {
        throw new Error('This package path does not exist');
      }

      // create package
      return Package.create({
        product_id: product_id,
        name: name,
        path: path
      });
    });
  }

  function getPackage()
  {
  }

  function updatePackage(package_id)
  {
  }

  /**
   * Delete a package
   *
   * @param {number} package_id
   * @promise {undefined}
   */
  function deletePackage(package_id)
  {
    return Package.destroy({
      where: {
        package_id: package_id
      }
    });
  }

  /**
   * Build a package
   *
   * @param {number} package_id
   * @promise {undefined}
   */
  function buildPackage(package_id)
  {
    // get package
    return Package.findOne({
      where: {
        package_id: package_id
      }
    }, {raw: true})

    // exec build-package
    .then(function(row) {
      if (row === null) {
        throw new Error('This package is not registered');
      }

      // TODO
      // Find a good way to locate script file

      return new Promise(function(resolve, reject) {
        var cmd = sprintf('./build-package.js -p %s -c', row.path);
        var cwd = api.config.general.paths.project + '/../app/script';
        var child = exec(cmd, {cwd: cwd}, function(err, stdout, stderr) {
          if (err) {
            return reject(err);
          }

          return resolve();
        });
      });
    });
  }

  // interface
  return {
    queryPackages: queryPackages,
    createPackage: createPackage,
    getPackage:    getPackage,
    updatePackage: updatePackage,
    deletePackage: deletePackage,
    buildPackage:  buildPackage
  };
};

