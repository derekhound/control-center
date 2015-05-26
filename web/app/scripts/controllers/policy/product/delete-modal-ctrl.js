'use strict';

angular.module('app')
  .controller('PolicyProductDeleteModalCtrl', [
    '$scope', '$model', '$modalInstance', 'product_id',
    function ($scope, $model, $modalInstance, product_id) {

    $scope.ok = function() {
      var params = {
        product_id: product_id
      };
      $model.products.delete(params, function(res) {
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

