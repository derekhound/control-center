'use strict';

angular.module('app')

  .controller('PackageBuildCreateModalCtrl', [
    '$scope', '$model', '$modalInstance', 'products',
    function ($scope, $model, $modalInstance, products) {

    $scope.model = {
      product_id: products[0].product_id,
      name: '',
      path: ''
    };

    $scope.products = products;

    $scope.ok = function() {
      var params = _.pick($scope.model, ['product_id', 'name', 'path']);
      $model.packages.save(params, function(res) {
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

  }]);

