'use strict';

angular.module('app')
  .controller('PolicyProductCreateModalCtrl', [
    '$scope', '$model', '$modalInstance',
    function ($scope, $model, $modalInstance) {

    $scope.model = {
      name: '',
      desc: ''
    };

    $scope.ok = function() {
      var params = _.pick($scope.model, ['name', 'desc']);
      $model.products.save(params, function(res) {
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

