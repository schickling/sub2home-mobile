'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var StoreService = require('./services/StoreService');
var PostalFilterService = require('./services/PostalFilterService');
var postalInputDirective = require('./directives/postalInputDirective');

module.exports = angular.module('home.home', [])
  .controller('MainCtrl', MainCtrl)
  .service('StoreService', StoreService)
  .service('PostalFilterService', PostalFilterService)
  .directive('postalInput', postalInputDirective)
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

      $routeProvider.when('/', {
        templateUrl: 'modules/home/home/templates/main.html',
        controller: 'MainCtrl',
        resolve: {
          stores: function(StoreService) {
            return StoreService.get();
          }
        }
      });

    }
  ]);