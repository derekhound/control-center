'use strict';

angular.module('app')
  .factory('$model', [
    '$resource', '$config', '$auth',
    function ($resource, $config, $auth) {

    var backend = $config.backend;

    function getToken()
    {
      return $auth.getToken();
    }

    var users = $resource(backend + '/api/1/users/:user_id', {
      token: getToken,
      user_id: '@user_id'
    }, {
      query:  {method: 'GET', isArray: false},
      update: {method: 'PUT', isArray: false},
    });

    var products = $resource(backend + '/api/1/products/:product_id', {
      token: getToken,
      product_id: '@product_id'
    }, {
      query:  {method: 'GET', isArray: false},
      update: {method: 'PUT', isArray: false}
    });

    var environments = $resource(backend + '/api/1/environments/:environment_id', {
      token: getToken,
      environment_id: '@environment_id'
    }, {
      query:  {method: 'GET', isArray: false},
      update: {method: 'PUT', isArray: false}
    });

    var roles = $resource(backend + '/api/1/roles/:role_id', {
      token: getToken,
      role_id: '@role_id'
    }, {
      query:  {method: 'GET', isArray: false},
      update: {method: 'PUT', isArray: false}
    });

    var packages = $resource(backend + '/api/1/packages/:package_id', {
      token: getToken,
      package_id: '@package_id'
    }, {
      query:  {method: 'GET',  isArray: false},
      update: {method: 'PUT',  isArray: false},

      // NON-REST APIs
      build:  {method: 'POST', isArray: false, url: backend + '/api/1/packages/build'}
    });

    var deploys = $resource(backend + '/api/1/deploy/:deploy_id', {
      token: getToken,
    }, {
      // NON-REST APIs
      query:        {method: 'POST', isArray: false, url: backend + '/api/1/deploy/query'},
      register:     {method: 'POST', isArray: false, url: backend + '/api/1/deploy/register'},
      deregister:   {method: 'POST', isArray: false, url: backend + '/api/1/deploy/deregister'},
      upgrade:      {method: 'POST', isArray: false, url: backend + '/api/1/deploy/upgrade'}
    });

    return {
      users:        users,
      products:     products,
      environments: environments,
      roles:        roles,
      packages:     packages,
      deploys:      deploys
    };

  }]);

