var _ = require('lodash');

module.exports = function(api, EnvironmentService) {

  function queryEnvironments(req, res)
  {
    var product_id = req.query.product_id;

    EnvironmentService.queryEnvironments(product_id)
    // success
    .then(function(environments) {
      var result = {
        success: true,
        count: environments.length,
        items: environments
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function createEnvironment(req, res)
  {
    var product_id  = req.body.product_id;
    var name        = req.body.name;
    var desc        = req.body.desc;

    EnvironmentService.createEnvironment(product_id, name, desc)
    // success
    .then(function(environment) {
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

  function getEnvironment(req, res)
  {
  }

  function updateEnvironment(req, res)
  {
  }

  function deleteEnvironment(req, res)
  {
    var environment_id = req.params.environment_id;

    EnvironmentService.deleteEnvironment(environment_id)
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
    queryEnvironments: queryEnvironments,
    createEnvironment: createEnvironment,
    getEnvironment:    getEnvironment,
    updateEnvironment: updateEnvironment,
    deleteEnvironment: deleteEnvironment
  };
};

