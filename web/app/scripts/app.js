'use strict';

angular
  .module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',        // angular-ui-router
    'ui.bootstrap',     // angular-bootstrap
    'ngStorage',
    'ngFileUpload'      // ng-file-upload
  ])

  .config(
    ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

    // for any unmatched url, redirect it
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');

    // setup states
    $stateProvider

      // portal
      .state('portal', {
        url: '/',
        resolve: {
          autologin: function($auth, $state) {
            $auth.login({}, function(res) {
              if (res.success) {
                $state.go('base.node.index');
              } else {
                $state.go('base.welcome.index');
              }
            });
          }
        }
      })

      // base
      .state('base', {
        url: '',
        templateUrl: 'views/base.html'
      })

      // auth
      .state('base.auth', {
        url: '',
        templateUrl: 'views/auth/base.html'
      })
      .state('base.auth.signup', {
        url: '/auth/signup',
        templateUrl: 'views/auth/signup/signup.html'
      })

      // welcome
      .state('base.welcome', {
        url: '',
        templateUrl: 'views/welcome/base.html'
      })
      .state('base.welcome.index', {
        url: '/welcome/index',
        templateUrl: 'views/welcome/index/index.html'
      })

      // node
      .state('base.node', {
        url: '',
        templateUrl: 'views/node/base.html'
      })
      .state('base.node.index', {
        url: '/node/index',
        templateUrl: 'views/node/index/index.html'
      })

      // package
      .state('base.package', {
        url: '',
        templateUrl: 'views/package/base.html'
      })
      .state('base.package.build', {
        url: '/package/build',
        templateUrl: 'views/package/build/build.html'
      })
      .state('base.package.deploy', {
        url: '/package/deploy',
        templateUrl: 'views/package/deploy/deploy.html'
      })

      // policy
      .state('base.policy', {
        url: '',
        templateUrl: 'views/policy/base.html'
      })
      .state('base.policy.product', {
        url: '/policy/product',
        templateUrl: 'views/policy/product/product.html'
      })
      .state('base.policy.environment', {
        url: '/policy/environment',
        templateUrl: 'views/policy/environment/environment.html'
      })
      .state('base.policy.role', {
        url: '/policy/role',
        templateUrl: 'views/policy/role/role.html'
      })

      // setting
      .state('base.setting', {
        url: '',
        templateUrl: 'views/setting/base.html'
      })
      .state('base.setting.index', {
        url: '/setting/index',
        templateUrl: 'views/setting/index/index.html'
      })

      ;

  }]);

