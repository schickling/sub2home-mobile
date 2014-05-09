'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var itemDirective = require('./directives/itemDirective');

module.exports = angular.module('store.home', [])
  .controller('StoreHomeCtrl', MainCtrl)
  .directive('item', itemDirective)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/memmingen', {
        templateUrl: 'modules/store/home/templates/index.html',
        controller: 'StoreHomeCtrl',
        resolve: {
          store: function(ResourcesService) {
            return ResourcesService.get('stores/memmingen');
          },
          categories: function(ResourcesService) {
            return ResourcesService.get('stores/memmingen/categories');
          },
        }
      });

    }
  ]);