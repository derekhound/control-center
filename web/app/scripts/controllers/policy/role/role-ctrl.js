'use strict';

angular.module('app')

  .controller('PolicyRoleCtrl', [
    '$scope', '$state', '$model', '$modal',
    function ($scope, $state, $model, $modal) {

    $scope.model = {
      product_id: null,
      environment_id: null
    };

    $scope.products = [];
    $scope.environments = [];

    $scope.items = [];

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
      // update environments 
      $scope.model.environment_id = null;
      $scope.environments = [];
      if ($scope.model.product_id) {
        queryEnvironment();
      }
      // update roles
      query();
    };

    //------------------------------
    // Environment
    //------------------------------
    
    function queryEnvironment()
    {
      var params = {};
      if ($scope.model.product_id) {
        params.product_id = $scope.model.product_id;
      }
      $model.environments.query(params, function(res) {
        if (res.success) {
          $scope.environments = res.items;          
        } else {
          console.log(res);
        }
      }); 
    }
    
    $scope.changeEnvironment = function() {
      query();
    };

    //------------------------------
    // Role
    //------------------------------

    function query()
    {
      var params = {};
      if ($scope.model.product_id) {
        params.product_id = $scope.model.product_id;
      }
      if ($scope.model.environment_id) {
        params.environment_id = $scope.model.environment_id;
      }
      $model.roles.query(params, function(res) {
        if (res.success) {
          $scope.items = res.items;          
        } else {
          console.log(res);
        }
      }); 
    }

    $scope.create = function() {
      // modal instance
      var modalInstance = $modal.open({
        templateUrl: 'views/policy/role/create-modal.html',
        controller: 'PolicyRoleCreateModalCtrl',
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

    $scope.delete = function(role_id) {
      // modal instance
      var modalInstance = $modal.open({
        templateUrl: 'views/policy/role/delete-modal.html',
        controller: 'PolicyRoleDeleteModalCtrl',
        resolve: {
          role_id: function() {
            return role_id;
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
