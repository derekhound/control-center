'use strict';

angular.module('app')

  .controller('PackageDeployRegisterModalCtrl', [
    '$scope', '$model', '$modalInstance', 'products',
    function ($scope, $model, $modalInstance, products) {

    $scope.model = {
      product_id: products[0].product_id,
      environment_id: null,
      role_id: null,
      package_id: null
    };

    $scope.products     = products;
    $scope.environments = [];
    $scope.roles        = [];
    $scope.packages     = [];

    //------------------------------

    $scope.changeProduct = function() {
      // reset environments
      $scope.model.environment_id = null;
      $scope.environments = [];

      // reset roles
      $scope.model.role_id = null;
      $scope.roles = [];

      // reset packages
      $scope.model.package_id = null;
      $scope.package_id = [];

      // update environments
      queryEnvironment();
    };

    function queryEnvironment()
    {
      var params = _.pick($scope.model, ['product_id']);
      $model.environments.query(params, function(res) {
        if (res.success) {
          if (res.count > 0) {
            // set environments
            $scope.model.environment_id = res.items[0].environment_id;
            $scope.environments = res.items;

            // update role
            queryRole();
          }
        } else {
          console.log(res);
        }
      });
    }

    $scope.changeEnvironment = function() {
      // reset roles
      $scope.model.role_id = null;
      $scope.roles = [];

      // reset packages
      $scope.model.package_id = null;
      $scope.package_id = [];

      // update environments
      queryRole();
    };

    function queryRole()
    {
      var params = _.pick($scope.model, ['environment_id']);
      $model.roles.query(params, function(res) {
        if (res.success) {
          if (res.count > 0) {
            // set roles
            $scope.model.role_id = res.items[0].role_id;
            $scope.roles = res.items;

            // update package
            queryPackage();
          }
        } else {
          console.log(res);
        }
      });
    }

    $scope.changeRole = function() {
      // reset packages
      $scope.model.package_id = null;
      $scope.package_id = [];

      // update packages
      queryPackage();
    };

    function queryPackage()
    {
      var params = _.pick($scope.model, ['product_id']);
      $model.packages.query(params, function(res) {
        if (res.success) {
          if (res.count > 0) {
            // set packages
            $scope.model.package_id = res.items[0].package_id;
            $scope.packages = res.items;
          }
        } else {
          console.log(res);
        }
      });
    }

    $scope.ok = function() {
      var params = _.pick($scope.model, ['role_id', 'package_id']);
      $model.deploys.register(params, function(res) {
        if (res.success) {
          $modalInstance.close();
        } else {
          console.log(res);
        }
      });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    (function init() {
      queryEnvironment();
    })();

  }]);

