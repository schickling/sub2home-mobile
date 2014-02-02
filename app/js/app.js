'use strict';

angular.module('mobile', [
  'ngRoute',
  // 'mobile.filters',
  // 'mobile.services',
  // 'mobile.directives',
  'mobile.controllers'
]).
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/home/info/main.html',
      controller: 'HomeInfoCtrl'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
]);

