'use strict';

angular.module('app')
  .controller('AuthSignupCtrl', [
    '$scope', '$state', '$model',
    function ($scope, $state, $model) {

    $scope.model = {
      email: '',
      password: ''
    };

    $scope.submit = function() {
      var params = _.pick($scope.model, ['email', 'password']);
      $model.users.save(params, function(res) {
        if (res.success) {
          $state.go('base.welcome.index');
        } else {
          console.log(res);
        }
      });
    };


    /*
    model.users.save({user_id: 123}, function(res) {
      console.log(res);
    });

    model.users.query(function(res) {
      console.log(res);
    });
    
    model.users.save(function(res) {
      console.log(res);
    });

    model.users.update({user_id: 123}, function(res) {
      console.log(res);
    });
    
    model.users.delete({user_id: 123}, function(res) {
      console.log(res);
    });
    */
  }]);
