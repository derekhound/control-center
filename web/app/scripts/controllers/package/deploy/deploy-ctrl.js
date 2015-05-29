'use strict';

angular.module('app')

  .controller('PackageDeployCtrl', [
    '$scope', '$state', '$model', '$modal',
    function ($scope, $state, $model, $modal) {

    $scope.model = {
      product_id:     null,
      environment_id: null,
      role_id:        null
    };

    $scope.products     = [];
    $scope.environments = [];
    $scope.roles        = [];

    $scope.items     = [];

    //------------------------------
    // Product
    //------------------------------

    function queryProduct()
    {
      var params = {};
      $model.products.query(params, function(res) {
        if (res.success) {
          $scope.products = res.items;
        } else {
          console.log(res);
        }
      });
    }

    $scope.changeProduct = function() {
      // reset environments
      $scope.model.environment_id = null;
      $scope.environments = [];

      // reset roles
      $scope.model.role_id = null;
      $scope.roles = [];

      // reset packages
      $scope.items = [];

      // update environments
      queryEnvironment();

      // update roles

      // update packages
      query();
    };

    //------------------------------
    // Environment
    //------------------------------

    function queryEnvironment()
    {
      var params = _.pick($scope.model, ['product_id']);
      $model.environments.query(params, function(res) {
        if (res.success) {
          $scope.environments = res.items;
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
      $scope.items = [];

      // update roles
      queryRole();

      // update packages
      query();
    };

    //------------------------------
    // Role
    //------------------------------

    function queryRole()
    {
      var params = _.pick($scope.model, ['environment_id']);
      $model.roles.query(params, function(res) {
        if (res.success) {
          $scope.roles = res.items;
        } else {
          console.log(res);
        }
      });
    }

    $scope.changeRole = function() {
      // reset packages
      $scope.items = [];

      // update packages
      query();
    };

    //------------------------------
    // Package
    //------------------------------

    function query()
    {
      var params = _.pick($scope.model, ['product_id', 'environment_id', 'role_id']);
      $model.deploys.query(params, function(res) {
        if (res.success) {
          $scope.items = res.items;
        } else {
          console.log(res);
        }
      });
    }

    $scope.register = function() {
      // modal instance
      var modalInstance = $modal.open({
        templateUrl: 'views/package/deploy/register-modal.html',
        controller: 'PackageDeployRegisterModalCtrl',
        resolve: {
          products: function() {
            return $scope.products;
          }
        }
      });
      // after closing modal
      modalInstance.result.then(function(result) {
        query();
      });
    };

    $scope.deregister = function(role_id, package_id) {
      // modal instance
      var modalInstance = $modal.open({
        templateUrl: 'views/package/deploy/deregister-modal.html',
        controller: 'PackageDeployDeregisterModalCtrl',
        resolve: {
          role_id: function() {
            return role_id;
          },
          package_id: function() {
            return package_id;
          }
        }
      });
      // after closing modal
      modalInstance.result.then(function(result) {
        query();
      });
    };

    (function init()
    {
      queryProduct();
      query();
    })();

  }]);
