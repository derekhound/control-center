'use strict';

angular.module('app')
  .controller('WelSigninCtrl', [
    '$scope', '$state', '$auth',
    function ($scope, $state, $auth) {

    $scope.model = {
      email: 'derekhound@gmail.com',
      password: '123'
    };

    $scope.submit = function() {
      var params = _.pick($scope.model, ['email', 'password']);
      $auth.login(params, function(res) {
        if (res.success) {
          $state.go('base.node.index');
        } else {
          console.log(res);
        }
      });
    };

  }]);

