module.exports = function(api, PackageService) {

  function queryPackages(req, res)
  {
    var product_id = req.query.product_id;

    PackageService.queryPackages(product_id)
    // success
    .then(function(packages) {
      var result = {
        success: true,
        count: packages.length,
        items: packages
      };
      res.send(result);
    })
    // fail
    .catch(function(err) {
      res.send({success: false, message: err.message});
    });
  }

  function createPackage(req, res)
  {
    var product_id  = req.body.product_id;
    var name        = req.body.name;
    var path        = req.body.path;

    PackageService.createPackage(product_id, name, path)
    // success
    .then(function(package) {
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

  function getPackage(req, res)
  {
  }

  function updatePackage(req, res)
  {
  }

  function deletePackage(req, res)
  {
    var package_id = req.params.package_id;

    PackageService.deletePackage(package_id)
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
    queryPackages: queryPackages,
    createPackage: createPackage,
    getPackage:    getPackage,
    updatePackage: updatePackage,
    deletePackage: deletePackage
  };
};

