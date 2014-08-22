'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var PostalFilterService = require('./services/PostalFilterService');
var StoreService = require('./services/StoreService');
var postalInputDirective = require('./directives/postalInputDirective');

module.exports = angular.module('home.home', [])
  .controller('HomeHomeCtrl', MainCtrl)
  .service('PostalFilterService', PostalFilterService)
  .service('StoreService', StoreService)
  .directive('postalInput', postalInputDirective)
  .config(['$routeProvider',
    function($routeProvider) {

      // TODO uncomment after launch
      //$routeProvider.when('/', {
      //templateUrl: 'modules/home/home/templates/index.html',
      //controller: 'HomeHomeCtrl',
      //resolve: {
      //storesCollection: ['StoreModelFactory',
      //function(StoreModelFactory) {
      //return StoreModelFactory.query().$promise;
      //}
      //],
      //selectedDeliveryAreaModel: ['PersistenceService',
      //function(PersistenceService) {
      //return PersistenceService.load('selectedDeliveryAreaModel');
      //}
      //],
      //}
      //});

    }
  ]);
