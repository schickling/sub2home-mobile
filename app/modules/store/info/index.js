'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('store.info', [])
  .controller('StoreInfoCtrl', MainCtrl)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/info', {
        templateUrl: 'modules/store/info/templates/index.html',
        controller: 'StoreInfoCtrl',
      });

    }
  ]);