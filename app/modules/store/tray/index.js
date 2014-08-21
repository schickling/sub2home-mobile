'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var TrayService = require('./services/TrayService');
var ArticleHelper = require('./services/ArticleHelper');
var singleItem = require('./directives/singleItem');
var menuItem = require('./directives/menuItem');
var subItem = require('./directives/subItem');
var editOptions = require('./directives/editOptions');
var clock = require('./directives/clock');

module.exports = angular.module('store.tray', [])
  .controller('StoreTrayCtrl', MainCtrl)
  .service('TrayService', TrayService)
  .service('ArticleHelper', ArticleHelper)
  .directive('singleItem', singleItem)
  .directive('menuItem', menuItem)
  .directive('subItem', subItem)
  .directive('editOptions', editOptions)
  .directive('clock', clock)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/tablett', {
        resolve: {
          storeModel: ['StoreModelFactory', '$route',
            function(StoreModelFactory, $route) {
              // TODO check if store is in localStorage
              return StoreModelFactory.get({
                storeAlias: $route.current.params.storeAlias
              }).$promise;
            }
          ]
        },
        templateUrl: 'modules/store/tray/templates/index.html',
        controller: 'StoreTrayCtrl',
      });

    }
  ]);
