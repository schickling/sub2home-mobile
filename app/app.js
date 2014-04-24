'use strict';

// vendor
require('angular/angular');
require('angular-route/angular-route');
require('angular-touch/angular-touch');

// modules
require('./modules/common');
require('./modules/home/home');
require('./modules/store/home');

angular.module('app', [
  'ngRoute',
  'ngTouch',
  'common',
  'home.home',
  'store.home',
]);

angular.module('app').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
]);