'use strict';

angular.module('mobile', [
  'ngRoute',
  // 'mobile.filters',
  // 'mobile.services',
  // 'mobile.directives',
  'mobile.controllers',
  'snap',
]).
config(function($routeProvider, snapRemoteProvider) {

  snapRemoteProvider.globalOptions.disable = 'right';

  $routeProvider.when('/', {
    templateUrl: 'views/home/info/main.html',
    controller: 'HomeInfoCtrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });

});