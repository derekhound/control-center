'use strict';

angular.module('app')
  .controller('PackageBuildDeleteModalCtrl', [
    '$scope', '$model', '$modalInstance', 'package_id',
    function ($scope, $model, $modalInstance, package_id) {

    $scope.ok = function() {
      var params = {
        package_id: package_id
      };
      $model.packages.delete(params, function(res) {
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

