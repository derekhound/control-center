var _             = require('lodash');
var Promise       = require('bluebird');
var fs            = require('fs');

module.exports = function(api, Sequelize) {

  var Package = api.model.rds.Package;

  /**
   * Query packages
   *
   * @promise {package[]} - An array of package objects
   */
  function queryPackages(product_id)
  {
    var options = {
      where: {
        product_id: product_id
      },
      order: [
        ['name', 'ASC']
      ]
    };
    return Package.findAll(options, {raw: true});
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

  // interface
  return {
    queryPackages: queryPackages,
    createPackage: createPackage,
    getPackage:    getPackage,
    updatePackage: updatePackage,
    deletePackage: deletePackage
  };
};

