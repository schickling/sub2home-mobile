'use strict';

// vendor
require('angular/angular');
require('angular-route/angular-route');
require('angular-touch/angular-touch');

// modules
require('./modules/home/home');

angular.module('app', [
  'ngRoute',
  'ngTouch',
  'home.home',
]);

angular.module('app').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
]);