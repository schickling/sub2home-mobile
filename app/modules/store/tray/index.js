'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var TrayService = require('./services/TrayService');
var singleItem = require('./directives/singleItem');

module.exports = angular.module('store.tray', [])
  .controller('StoreTrayCtrl', MainCtrl)
  .service('TrayService', TrayService)
  .directive('singleItem', singleItem)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/tablett', {
        templateUrl: 'modules/store/tray/templates/index.html',
        controller: 'StoreTrayCtrl',
      });

    }
  ]);
