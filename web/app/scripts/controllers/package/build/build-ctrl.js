'use strict';

angular.module('app')

  .controller('PackageBuildCtrl', [
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
      $scope.items = [];
      query();
    };

    function query()
    {
      if ($scope.model.product_id === null) {
        return;
      }

      var params = {
        product_id: $scope.model.product_id
      };
      $model.packages.query(params, function(res) {
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
        templateUrl: 'views/package/build/create-modal.html',
        controller: 'PackageBuildCreateModalCtrl',
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

    $scope.delete = function(package_id) {
      // modal instance
      var modalInstance = $modal.open({
        templateUrl: 'views/package/build/delete-modal.html',
        controller: 'PackageBuildDeleteModalCtrl',
        resolve: {
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

    $scope.build = function(package_id) {
      var params = {
        package_id: package_id
      };
      $model.packages.build(params, function(res) {
        if (res.success) {
          query();
        } else {
          console.log(res);
        }
      });
    };

    (function init()
    {
      queryProduct();
    })();

  }]);
