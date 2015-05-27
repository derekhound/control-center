var _ = require('lodash');

module.exports = function(api, RoleService) {

  function queryRoles(req, res)
  {
    var product_id      = req.query.product_id;
    var environment_id  = req.query.environment_id;

    RoleService.queryRoles(product_id, environment_id)
    // success
    .then(function(roles) {
      var result = {
        success: true,
        count: roles.length,
        items: roles
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function createRole(req, res)
  {
    var environment_id  = req.body.environment_id;
    var name            = req.body.name;
    var desc            = req.body.desc;

    RoleService.createRole(environment_id, name, desc)
    // success
    .then(function(role) {
      var result = {
        success: true
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function getRole(req, res)
  {
  }

  function updateRole(req, res)
  {
  }

  function deleteRole(req, res)
  {
    var role_id = req.params.role_id;

    RoleService.deleteRole(role_id)
    // success
    .then(function() {
      var result = {
        success: true
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  return {
    queryRoles: queryRoles,
    createRole: createRole,
    getRole:    getRole,
    updateRole: updateRole,
    deleteRole: deleteRole
  };
};

