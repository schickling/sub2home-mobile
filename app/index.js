'use strict';

// vendor
require('angular/angular');
require('angular-route/angular-route');
require('angular-touch/angular-touch');
require('angular-local-storage/angular-local-storage');
require('angular-bind-once/bindonce');
var _ = require('lodash');

// modules
require('./modules/common');
require('./modules/home/home');
require('./modules/store/home');

angular.module('app', [
  // core
  'ngRoute',
  'ngTouch',
  // libs
  'LocalStorageModule',
  'pasvaz.bindonce',
  // own code
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
