'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('store.home', [])
  .controller('StoreHomeCtrl', MainCtrl)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/memmingen', {
        templateUrl: 'modules/store/home/templates/index.html',
        controller: 'StoreHomeCtrl',
        resolve: {
          store: function() {
            return [];
          }
        }
      });

    }
  ]);