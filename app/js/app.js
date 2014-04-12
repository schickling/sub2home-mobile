'use strict';

require('angular/angular');
require('angular-route/angular-route');
require('angular-touch/angular-touch');

angular.module('mobile', [
  'ngRoute',
  'ngTouch',
  require('./controllers/home/home/HomeHomeCtrl').name,
])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $routeProvider.when('/', {
        templateUrl: 'views/home/home/main.html',
        controller: 'HomeHomeCtrl'
      });

      $routeProvider.otherwise({
        redirectTo: '/'
      });

    }
  ]);
