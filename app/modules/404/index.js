'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('404', [])
  .controller('404Ctrl', MainCtrl)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/404', {
        templateUrl: 'modules/404/templates/index.html',
        controller: '404Ctrl',
      });

      $routeProvider.otherwise({
        redirectTo: '/404',
      });

    }
  ]);
