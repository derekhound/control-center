var _             = require('lodash');
var Promise       = require('bluebird');

module.exports = function(api, Sequelize) {

  var Product     = api.model.rds.Product;
  var Role = api.model.rds.Role;

  /**
   * Query roles
   *
   * @params {number} product_id
   * @params {number} environment_id
   * @promise {role[]} - An array of role model instances
   */
  function queryRoles(product_id, environment_id)
  {
    var conditions = [];
    var conditions_str = '';

    if (product_id) {
      conditions.push('p.product_id = ' + product_id);
    }
    if (environment_id) {
      conditions.push('e.environment_id = ' + environment_id);
    }
    if (conditions.length > 0) {
      conditions_str = 'WHERE ' + conditions.join(' AND ');
    }

    var sql = [
      'SELECT',
        'r.*,',
        'e.name AS environment_name,',
        'p.name AS product_name',
      'FROM',
        'roles AS r',
      'JOIN',
        'environments as e ON r.environment_id = e.environment_id',
      'JOIN',
        'products as p ON e.product_id = p.product_id',
      conditions_str,
      'ORDER BY',
        'p.name ASC,',
        'e.name ASC,',
        'r.name ASC'
    ].join(' ');

    return Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
  }

  /**
   * Create a role
   *
   * @param {number} environment_id
   * @param {string} name
   * @param {string} desc - description
   * @promise {role} - A role model instance
   */
  function createRole(environment_id, name, desc)
  {
    // get product
    return Role.findOne({
      where: {
        environment_id: environment_id,
        name: name
      }
    }, {raw: true})
    .then(function(row) {
      // product exists
      if (row) {
        throw new Error('This role name has been used');
      }

      // create role
      return Role.create({
        environment_id: environment_id,
        name: name,
        desc: desc
      });
    });
  }

  function getRole()
  {
  }

  function updateRole(role_id)
  {
  }

  /**
   * Delete a role
   *
   * @param {number} role_id
   * @promise {undefined}
   */
  function deleteRole(role_id)
  {
    return Role.destroy({
      where: {
        role_id: role_id
      }
    });
  }

  // interface
  return {
    queryRoles: queryRoles,
    createRole: createRole,
    getRole:    getRole,
    updateRole: updateRole,
    deleteRole: deleteRole
  };
};

