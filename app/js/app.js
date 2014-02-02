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

  var snapSettings = {
    disable: 'right',
    flickThreshold: 20,
  };

  angular.extend(snapRemoteProvider.globalOptions, snapSettings);

  $routeProvider.when('/', {
    templateUrl: 'views/home/info/main.html',
    controller: 'HomeInfoCtrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });

});