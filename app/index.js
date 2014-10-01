'use strict';

var bowser = require('bowser');

if (bowser.msie && bowser.version < 8) {
  window.location.href = 'http://browser.sub2home.com';
}

// vendor
require('angular/angular');
require('angular-route/angular-route');
require('angular-touch/angular-touch');
require('angular-resource/angular-resource');
require('angular-local-storage/angular-local-storage');
require('angular-bindonce');
require('angular-scroll');
var fastclick = require('fastclick');
var _ = require('lodash');

// modules
require('./modules/vendor');
require('./modules/common');
require('./modules/resources');
require('./modules/404');
require('./modules/home');
require('./modules/store');
require('./modules/template-cache');

angular.module('app', [
  // core
  'ngRoute',
  'ngTouch',
  'ngResource',
  // libs
  'LocalStorageModule',
  'pasvaz.bindonce',
  'duScroll',
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
    $locationProvider.html5Mode(true);
  }
]);

angular.module('app').run(['ResourceService', '$location', '$rootScope',
  '$window', 'RoutingService', 'PageLockService', '$timeout',
  function(ResourceService, $location, $rootScope, $window, RoutingService,
    PageLockService, $timeout) {

    // initial page lock
    PageLockService.lock();

    var errorCallback = function() {
      $location.path('/404');
      $location.replace();
    };

    ResourceService.setErrorCallback(errorCallback);

    fastclick(document.body);

    $rootScope.$on('$routeChangeSuccess', function() {
      $window.scrollTo(0, 0);
      $window.analytics.page();
      $timeout(PageLockService.unlock, 0);
    });

    // convenient way to navigate in templates and controllers
    $rootScope.navigate = RoutingService.navigate;

  }
]);
