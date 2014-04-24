'use strict';

var MainCtrl = require('./controllers/MainCtrl'),
  StoresResourceService = require('./services/StoresResourceService'),
  PostalFilterService = require('./services/PostalFilterService'),
  StoreService = require('./services/StoreService'),
  postalInputDirective = require('./directives/postalInputDirective');

module.exports = angular.module('home.home', [])
  .controller('MainCtrl', MainCtrl)
  .service('StoresResourceService', StoresResourceService)
  .service('PostalFilterService', PostalFilterService)
  .service('StoreService', StoreService)
  .directive('postalInput', postalInputDirective)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/', {
        templateUrl: 'modules/home/home/templates/main.html',
        controller: 'MainCtrl',
        resolve: {
          stores: function(StoresResourceService) {
            return StoresResourceService.get();
          }
        }
      });

    }
  ]);
