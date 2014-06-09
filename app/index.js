'use strict';

// vendor
require('angular/angular');
require('angular-route/angular-route');
require('angular-touch/angular-touch');
require('angular-resource/angular-resource');
require('angular-local-storage/angular-local-storage');
require('angular-bindonce/bindonce');
var fastclick = require('fastclick');
var _ = require('lodash');

// modules
require('./modules/common');
require('./modules/resources');
require('./modules/404');
require('./modules/home');
require('./modules/store');
require('./modules/template-cache');

angular.module('app', [
  // core
  'ngRoute',
  // 'ngTouch',
  'ngResource',
  // libs
  'LocalStorageModule',
  'pasvaz.bindonce',
  // own code
  'common',
  'resources',
  '404',
  'home',
  'store',
  'template-cache',
]);

angular.module('app').constant('_', _);

angular.module('app').config(['$locationProvider',
  function($locationProvider) {
    // $locationProvider.html5Mode(true);
  }
]);

angular.module('app').run(['ResourceService', '$location',
  function(ResourceService, $location) {

    var errorCallback = function() {
      $location.path('/404');
      $location.replace();
    };

    ResourceService.setErrorCallback(errorCallback);

    fastclick(document.body);

  }
])