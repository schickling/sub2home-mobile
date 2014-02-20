'use strict';

angular.module('mobile', [
  'ngRoute',
  // 'mobile.filters',
  // 'mobile.services',
  // 'mobile.directives',
  'mobile.controllers',
  'snap',
  'ngTouch',
])
  .constant('_', window._)
  .config(['$routeProvider', 'snapRemoteProvider',
    function($routeProvider, snapRemoteProvider) {

      snapRemoteProvider.globalOptions = {
        disable: 'right',
        flickThreshold: 20,
        hyperextensible: false,
        maxPosition: 210,
      };

      $routeProvider.when('/', {
        templateUrl: 'views/home/info/main.html',
        controller: 'HomeInfoCtrl'
      });

      $routeProvider.otherwise({
        redirectTo: '/'
      });

    }
  ]);
