'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('store.checkout', [])
  .controller('StoreCheckoutCtrl', MainCtrl)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/danke', {
        templateUrl: 'modules/store/checkout/templates/index.html',
        controller: 'StoreCheckoutCtrl',
      });

    }
  ]);