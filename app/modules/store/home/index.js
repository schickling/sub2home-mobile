'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var itemDirective = require('./directives/itemDirective');
var colRepeatDirective = require('./directives/colRepeatDirective');

module.exports = angular.module('store.home', [])
  .controller('StoreHomeCtrl', MainCtrl)
  .directive('item', itemDirective)
  .directive('colRepeat', colRepeatDirective)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias', {
        resolve: {
          load: ['$route', '$location', 'CategoriesFactory',
            function($route, $location, CategoriesFactory) {

              var storeAlias = $route.current.params.storeAlias;

              var promise = CategoriesFactory.query({
                storeAlias: storeAlias
              }).$promise;

              promise.then(function(data) {
                if (data.length > 0) {
                  $location.path('/' + storeAlias + '/' + data[0].id);
                } else {
                  $location.path('/404');
                }
                $location.replace();
              });

              return promise;

            }
          ]
        }
      });

      $routeProvider.when('/:storeAlias/:categoryId', {
        templateUrl: 'modules/store/home/templates/index.html',
        controller: 'StoreHomeCtrl',
        resolve: {
          store: ['StoresFactory', '$route',
            function(StoresFactory, $route) {
              return StoresFactory.get({
                storeAlias: $route.current.params.storeAlias
              });
            }
          ],
          categories: ['CategoriesFactory', '$route', '$q', '$location', '_',
            function(CategoriesFactory, $route, $q, $location, _) {

              var defer = $q.defer();
              var categoryId = parseInt($route.current.params.categoryId, 10);
              var resourcePromise = CategoriesFactory.query({
                storeAlias: $route.current.params.storeAlias
              }).$promise;

              resourcePromise.then(function(categories) {
                var category = _.findWhere(categories, {
                  id: categoryId
                });
                if (category) {
                  categories.current = category;
                  defer.resolve(categories);
                } else {
                  $location.path('/404');
                  $location.replace();
                }
              });

              return defer.promise;

            }
          ],
          selectedDeliveryArea: ['PersistenceService',
            function(PersistenceService) {
              return PersistenceService.load('selectedDeliveryArea');
            }
          ],
        }
      });

    }
  ]);