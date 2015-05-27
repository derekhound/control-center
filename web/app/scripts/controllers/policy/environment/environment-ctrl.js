'use strict';

angular.module('app')
  .controller('PolicyEnvironmentCtrl', [
    '$scope', '$state', '$model', '$modal',
    function ($scope, $state, $model, $modal) {

    $scope.model = {
      product_id: null
    };

    $scope.products = [];

    $scope.items = [];

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
      query();
    };

    function query()
    {
      var params = {};
      if ($scope.model.product_id) {
        params.product_id = $scope.model.product_id
      }
      $model.environments.query(params, function(res) {
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
        templateUrl: 'views/policy/environment/create-modal.html',
        controller: 'PolicyEnvironmentCreateModalCtrl',
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

    $scope.delete = function(environment_id) {
      // modal instance
      var modalInstance = $modal.open({
        templateUrl: 'views/policy/environment/delete-modal.html',
        controller: 'PolicyEnvironmentDeleteModalCtrl',
        resolve: {
          environment_id: function() {
            return environment_id;
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
