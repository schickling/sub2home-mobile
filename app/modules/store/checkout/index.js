'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var ParseService = require('./services/ParseService');

module.exports = angular.module('store.checkout', [])
  .controller('StoreCheckoutCtrl', MainCtrl)
  .service('ParseService', ParseService)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/danke', {
        templateUrl: 'modules/store/checkout/templates/index.html',
        controller: 'StoreCheckoutCtrl',
      });

    }
  ]);
