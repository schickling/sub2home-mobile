'use strict';

angular.module('mobile', [
  'ngRoute',
  // 'mobile.filters',
  // 'mobile.services',
  // 'mobile.directives',
  'mobile.controllers',
  'snap',
])
.constant('_', window._)
.config(function($routeProvider, snapRemoteProvider) {

  snapRemoteProvider.globalOptions = {
    disable: 'right',
    flickThreshold: 20,
  };

  $routeProvider.when('/', {
    templateUrl: 'views/home/info/main.html',
    controller: 'HomeInfoCtrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });

});