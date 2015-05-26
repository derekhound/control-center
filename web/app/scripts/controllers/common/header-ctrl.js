'use strict';

angular.module('app')
  .controller('HeaderCtrl', [
    '$scope', '$state', '$auth',
    function ($scope, $state, $auth) {

    $scope.isLogin = function() {
      return !!$auth.getToken();
    };

    $scope.logout = function() {
      $auth.logout(function() {
        $state.go('base.welcome.index');
      });
    };

    $scope.isActive = function(state) {
      return $state.includes(state);
    };

  }]);

