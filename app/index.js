'use strict';

// vendor
require('angular/angular');
require('angular-route/angular-route');
require('angular-touch/angular-touch');
require('angular-local-storage/angular-local-storage');
var _ = require('lodash');

// modules
require('./modules/common');
require('./modules/home/home');
require('./modules/store/home');

angular.module('app', [
  'ngRoute',
  'ngTouch',
  'LocalStorageModule',
  'common',
  'home.home',
  'store.home',
]);

angular.module('app').constant('_', _);

angular.module('app').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
]);
