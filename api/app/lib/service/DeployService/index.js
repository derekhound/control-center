var _             = require('lodash');
var Promise       = require('bluebird');

module.exports = function(api, Sequelize) {

  var RolePackage = api.model.rds.RolePackage;

  function queryPackages(product_id, environment_id, role_id)
  {
    var conditions = [];
    var conditions_str = '';

    if (product_id) {
      conditions.push('p.product_id = ' + product_id);
    }
    if (environment_id) {
      conditions.push('e.environment_id = ' + environment_id);
    }
    if (role_id) {
      conditions.push('r.role_id = ' + role_id);
    }
    if (conditions.length > 0) {
      conditions_str = 'WHERE ' + conditions.join(' AND ');
    }

    var sql = [
      'SELECT',
        'rp.role_id,',
        'rp.package_id,',
        'rp.version AS current,',
        'pkg.name AS package_name,',
        'pkg.latest AS latest,',
        'p.name AS product_name,',
        'e.name AS environment_name,',
        'r.name AS role_name',
      'FROM',
        'role_package AS rp',
      'JOIN',
        'package AS pkg ON rp.package_id = pkg.package_id',
      'JOIN',
        'role AS r ON rp.role_id = r.role_id',
      'JOIN',
        'environment AS e ON r.environment_id = e.environment_id',
      'JOIN',
        'product as p ON e.product_id = p.product_id',
      conditions_str,
      'ORDER BY',
        'p.name ASC,',
        'e.name ASC,',
        'r.name ASC,',
        'pkg.name ASC'
    ].join(' ');

    return Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
  }


  /**
   * Register a package at the role
   *
   * @param {number} role_id
   * @param {number} package_id
   * @promise {role_package} - A role_package model instance
   */
  function registerPackage(role_id, package_id)
  {
    // get role_package
    return RolePackage.findOne({
      where: {
        role_id: role_id,
        package_id: package_id
      }
    }, {raw: true})

    // create role_package
    .then(function(row) {
      if (row) {
        throw new Error('This package has already been registered');
      }

      return RolePackage.create({
        role_id: role_id,
        package_id: package_id
      });
    });
  }

  /**
   * Deregister a package at the role
   *
   * @param {number} role_id
   * @param {number} package_id
   * @promise {undefined}
   */
  function deregisterPackage(role_id, package_id)
  {
    return RolePackage.destroy({
      where: {
        role_id: role_id,
        package_id: package_id
      }
    });
  }

  function upgradePackage(role_id, package_id, version)
  {

  }

  // interface
  return {
    queryPackages: queryPackages,
    registerPackage: registerPackage,
    deregisterPackage: deregisterPackage,
    upgradePackage: upgradePackage
  };
};

