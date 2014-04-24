'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('store.home', [])
  .controller('MainCtrl', MainCtrl)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/memmingen', {
        templateUrl: 'modules/store/home/templates/main.html',
        controller: 'MainCtrl'
      });

    }
  ]);