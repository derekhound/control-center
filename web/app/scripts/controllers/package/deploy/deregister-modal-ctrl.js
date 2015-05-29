'use strict';

angular.module('app')
  .controller('PackageDeployDeregisterModalCtrl', [
    '$scope', '$model', '$modalInstance', 'role_id', 'package_id',
    function ($scope, $model, $modalInstance, role_id, package_id) {

    $scope.ok = function() {
      var params = {
        role_id: role_id,
        package_id: package_id
      };
      $model.deploys.deregister(params, function(res) {
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

