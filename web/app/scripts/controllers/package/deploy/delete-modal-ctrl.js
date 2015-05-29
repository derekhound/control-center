'use strict';

angular.module('app')
  .controller('PolicyRoleDeleteModalCtrl', [
    '$scope', '$model', '$modalInstance', 'role_id',
    function ($scope, $model, $modalInstance, role_id) {

    $scope.ok = function() {
      var params = {
        role_id: role_id
      };
      $model.roles.delete(params, function(res) {
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

