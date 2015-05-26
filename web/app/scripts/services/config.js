'use strict';

angular.module('app')
  .factory('$config', function() {
    return {
      backend: 'http://localhost:3000'
    };
  });

