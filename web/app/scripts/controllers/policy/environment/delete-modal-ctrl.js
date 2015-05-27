'use strict';

angular.module('app')
  .controller('PolicyEnvironmentDeleteModalCtrl', [
    '$scope', '$model', '$modalInstance', 'environment_id',
    function ($scope, $model, $modalInstance, environment_id) {

    $scope.ok = function() {
      var params = {
        environment_id: environment_id
      };
      $model.environments.delete(params, function(res) {
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

