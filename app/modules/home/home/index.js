'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('home.home', [])
  .controller('MainCtrl', MainCtrl)
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $routeProvider.when('/', {
        templateUrl: 'modules/home/home/templates/main.html',
        controller: 'MainCtrl'
      });

      $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ]);