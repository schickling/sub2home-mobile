'use strict';

var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('home.info', [])
  .controller('HomeInfoCtrl', MainCtrl)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/info', {
        templateUrl: 'modules/home/info/templates/index.html',
        controller: 'HomeInfoCtrl',
        resolve: {
          storesCollection: ['StoreModelFactory',
            function(StoreModelFactory) {
              return StoreModelFactory.query().$promise;
            }
          ],
        }
      });

    }
  ]);
