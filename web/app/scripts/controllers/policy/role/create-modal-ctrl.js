'use strict';

angular.module('app')
  .controller('PolicyRoleCreateModalCtrl', [
    '$scope', '$model', '$modalInstance', 'products',
    function ($scope, $model, $modalInstance, products) {

    $scope.model = {
      product_id: products[0].product_id,
      environment_id: null,
      name: '',
      desc: ''
    };

    $scope.products = products;
    $scope.environments = [];

    //------------------------------

    $scope.changeProduct = function() {
      // update environments
      $scope.environments = [];
      $scope.model.environment_id = null;
      queryEnvironment();
    };

    function queryEnvironment()
    {
      var params = {
        product_id: $scope.model.product_id
      };
      $model.environments.query(params, function(res) {
        if (res.success) {
          if (res.count == 0) {
            $scope.environments = [];
            $scope.model.environment_id = null;
          } else {
            $scope.environments = res.items;
            $scope.model.environment_id = res.items[0].environment_id;
          }

        } else {
          console.log(res);
        }
      });
    }

    $scope.ok = function() {
      var params = _.pick($scope.model, ['environment_id', 'name', 'desc']);
      $model.roles.save(params, function(res) {
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

