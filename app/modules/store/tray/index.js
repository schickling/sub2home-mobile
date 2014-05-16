'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('store.tray', [])
  .controller('StoreTrayCtrl', MainCtrl)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/tablett', {
        templateUrl: 'modules/store/tray/templates/index.html',
        controller: 'StoreTrayCtrl',
      });

    }
  ]);