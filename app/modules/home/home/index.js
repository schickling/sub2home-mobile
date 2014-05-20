'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var PostalFilterService = require('./services/PostalFilterService');
var StoreService = require('./services/StoreService');
var postalInputDirective = require('./directives/postalInputDirective');
var rotateDirective = require('./directives/rotateDirective');

module.exports = angular.module('home.home', [])
  .controller('HomeHomeCtrl', MainCtrl)
  .service('PostalFilterService', PostalFilterService)
  .service('StoreService', StoreService)
  .directive('postalInput', postalInputDirective)
  .directive('rotate', rotateDirective)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/', {
        templateUrl: 'modules/home/home/templates/index.html',
        controller: 'HomeHomeCtrl',
        resolve: {
          stores: function(StoresFactory) {
            return StoresFactory.query().$promise;
          },
          selectedDeliveryArea: function(PersistenceService) {
            return PersistenceService.load('selectedDeliveryArea');
          },
        }
      });

    }
  ]);