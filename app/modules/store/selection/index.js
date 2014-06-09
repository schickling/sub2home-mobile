'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('store.selection', [])
  .controller('StoreSelectionCtrl', MainCtrl)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/theke/artikel/:articleId', {
        templateUrl: 'modules/store/selection/templates/index.html',
        controller: 'StoreSelectionCtrl',
      });

      $routeProvider.when('/:storeAlias/theke/menu/:menuId', {
        templateUrl: 'modules/store/selection/templates/index.html',
        controller: 'StoreSelectionCtrl',
      });

    }
  ]);