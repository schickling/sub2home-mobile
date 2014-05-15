'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var itemDirective = require('./directives/itemDirective');

module.exports = angular.module('store.home', [])
  .controller('StoreHomeCtrl', MainCtrl)
  .directive('item', itemDirective)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:alias', {
        resolve: {
          load: ['$route', '$location', 'ResourcesService',
            function($route, $location, ResourcesService) {

              var alias = $route.current.params.alias;
              var promise = ResourcesService.get('stores/' + alias + '/categories');

              promise.then(function(data) {
                if (data.length > 0) {
                  $location.path('/' + alias + '/' + data[0].id);
                } else {
                  $location.path('/404');
                }
              });

              return promise;

            }
          ]
        }
      });

      $routeProvider.when('/:alias/:categoryId', {
        templateUrl: 'modules/store/home/templates/index.html',
        controller: 'StoreHomeCtrl',
        resolve: {
          store: ['ResourcesService', '$route',
            function(ResourcesService, $route) {
              return ResourcesService.get('stores/' + $route.current.params.alias);
            }
          ],
          categories: ['ResourcesService', '$route', '$q', '$location', '_',
            function(ResourcesService, $route, $q, $location, _) {

              var defer = $q.defer();
              var fragment = 'stores/' + $route.current.params.alias + '/categories';
              var categoryId = parseInt($route.current.params.categoryId, 10);

              ResourcesService.get(fragment).then(function(data) {
                var category = _.findWhere(data, {
                  id: categoryId
                });
                if (category) {
                  data.current = category;
                  defer.resolve(data);
                } else {
                  $location.path('/404');
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