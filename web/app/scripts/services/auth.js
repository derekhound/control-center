'use strict';

angular.module('app')
  .factory('$auth', [
    '$http', '$localStorage', '$config',
    function ($http, $localStorage, $config) {

    // setup local storage
    $localStorage.$default({
      user: null
    });

    function login(params, next)
    {
      // append token parameter
      if ($localStorage.user) {
        params.token = $localStorage.user.token;
      }

      // fire
      return $http({
        method: 'POST',
        url: $config.backend + '/api/1/login',
        data: params
      })
      .success(function(res, status) {
        // save data into local storage
        if (res.success) {
          $localStorage.user = res.item;
        }
        next(res);
      })
      .error(function() {
        // TODO
      });
    }

    function logout(next)
    {
      $localStorage.user = null;
      next();
    }

    function getUserId()
    {
      if ($localStorage.user) {
        return $localStorage.user.user_id;
      } else {
        return false;
      }
    }

    function getToken()
    {
      if ($localStorage.user) {
        return $localStorage.user.token;
      } else {
        return false;
      }
    }

    // interface
    return {
      login:      login,
      logout:     logout,
      getUserId:  getUserId,
      getToken:   getToken
    };
  }]);

