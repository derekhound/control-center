module.exports = function(api, DeployService) {

  function queryPackages(req, res)
  {
    var product_id      = req.body.product_id;
    var environment_id  = req.body.environment_id;
    var role_id         = req.body.role_id;

    DeployService.queryPackages(product_id, environment_id, role_id)
    // success
    .then(function(rows) {
      var result = {
        success: true,
        count: rows.length,
        items: rows
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function registerPackage(req, res)
  {
    var role_id     = req.body.role_id;
    var package_id  = req.body.package_id;

    DeployService.registerPackage(role_id, package_id)
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

  function deregisterPackage(req, res)
  {
    var role_id     = req.body.role_id;
    var package_id  = package_id;

    DeployService.deregisterPackage(role_id, package_id)
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

  function upgradePackage(req, res)
  {

  }

  return {
    queryPackages: queryPackages,
    registerPackage: registerPackage,
    deregisterPackage: deregisterPackage,
    upgradePackage:  upgradePackage
  };
};

