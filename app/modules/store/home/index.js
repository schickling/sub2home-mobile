'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var itemDirective = require('./directives/itemDirective');
var colRepeatDirective = require('./directives/colRepeatDirective');
var wordSplitFilter = require('./filters/wordSplitFilter');

module.exports = angular.module('store.home', [])
  .controller('StoreHomeCtrl', MainCtrl)
  .directive('item', itemDirective)
  .directive('colRepeat', colRepeatDirective)
  .filter('wordSplit', wordSplitFilter)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias', {
        resolve: {
          load: ['$route', '$location', 'CategoryModelFactory',
            function($route, $location, CategoryModelFactory) {

              var storeAlias = $route.current.params.storeAlias;

              var promise = CategoryModelFactory.query({
                storeAlias: storeAlias
              }).$promise;

              promise.then(function(categoriesCollection) {
                if (categoriesCollection.length > 0) {
                  $location.path('/' + storeAlias + '/' + categoriesCollection[0].id);
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
          storeModel: ['StoreModelFactory', '$route',
            function(StoreModelFactory, $route) {
              return StoreModelFactory.get({
                storeAlias: $route.current.params.storeAlias
              });
            }
          ],
          categoriesCollection: ['CategoryModelFactory', '$route', '$q', '$location', '_',
            function(CategoryModelFactory, $route, $q, $location, _) {

              var defer = $q.defer();
              var categoryId = parseInt($route.current.params.categoryId, 10);
              var resourcePromise = CategoryModelFactory.query({
                storeAlias: $route.current.params.storeAlias
              }).$promise;

              resourcePromise.then(function(categoriesCollection) {
                var categoryModel = _.findWhere(categoriesCollection, {
                  id: categoryId
                });
                if (categoryModel) {
                  categoriesCollection.current = categoryModel;
                  defer.resolve(categoriesCollection);
                } else {
                  $location.path('/404');
                  $location.replace();
                }
              });

              return defer.promise;

            }
          ],
          selectedDeliveryAreaModel: ['PersistenceService',
            function(PersistenceService) {
              return PersistenceService.load('selectedDeliveryAreaModel');
            }
          ],
        }
      });

    }
  ]);
