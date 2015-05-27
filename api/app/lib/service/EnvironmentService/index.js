var _             = require('lodash');
var Promise       = require('bluebird');

module.exports = function(api, Sequelize) {

  var Product     = api.model.rds.Product;
  var Environment = api.model.rds.Environment;

  /**
   * Query environments
   *
   * @params {number} product_id
   * @promise {environment[]} - An array of environment model instances
   */
  function queryEnvironments(product_id)
  {
    var conditions = [];
    var conditions_str = '';

    if (product_id) {
      conditions.push('e.product_id = ' + product_id);
    }
    if (conditions.length > 0) {
      conditions_str = 'WHERE ' + conditions.join(' AND ');
    }

    var sql = [
      'SELECT',
        'e.*,',
        'p.name AS product_name',
      'FROM',
        'environments AS e',
      'JOIN',
        'products as p ON p.product_id = e.product_id',
      conditions_str,
      'ORDER BY',
        'p.name ASC,',
        'e.name ASC'
    ].join(' ');

    return Sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
  }

  /**
   * Create a environment
   *
   * @param {number} product_id
   * @param {string} name
   * @param {string} desc - description
   * @promise {environment} - A environment model instance
   */
  function createEnvironment(product_id, name, desc)
  {
    // get product
    return Environment.findOne({
      where: {
        product_id: product_id,
        name: name
      }
    }, {raw: true})
    .then(function(row) {
      // product exists
      if (row) {
        throw new Error('This environment name has been used');
      }

      // create environment
      return Environment.create({
        product_id: product_id,
        name: name,
        desc: desc
      });
    });
  }

  function getEnvironment()
  {
  }

  function updateEnvironment(environment_id)
  {
  }

  /**
   * Delete a environment
   *
   * @param {number} environment_id
   * @promise {undefined}
   */
  function deleteEnvironment(environment_id)
  {
    return Environment.destroy({
      where: {
        environment_id: environment_id
      }
    });
  }

  // interface
  return {
    queryEnvironments: queryEnvironments,
    createEnvironment: createEnvironment,
    getEnvironment:    getEnvironment,
    updateEnvironment: updateEnvironment,
    deleteEnvironment: deleteEnvironment
  };
};

