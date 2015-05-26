'use strict';

angular.module('app')
  .controller('PolicyProductCtrl', [
    '$scope', '$state', '$model', '$modal',
    function ($scope, $state, $model, $modal) {

    $scope.model = {
    
    };

    $scope.items = [];

    function query()
    {
      var params = {};
      $model.products.query(params, function(res) {
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
        templateUrl: 'views/policy/product/create-modal.html',
        controller: 'PolicyProductCreateModalCtrl'
      });
      // after closing modal
      modalInstance.result.then(function(result) {
        init();
      });
    };

    $scope.delete = function(product_id) {
      // modal instance
      var modalInstance = $modal.open({
        templateUrl: 'views/policy/product/delete-modal.html',
        controller: 'PolicyProductDeleteModalCtrl',
        resolve: {
          product_id: function() {
            return product_id;
          }
        }
      });
      // after closing modal
      modalInstance.result.then(function(result) {
        init();
      });
    };

    function init()
    {
      query();
    };

    init();

  }]);
