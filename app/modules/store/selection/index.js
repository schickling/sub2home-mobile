'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var OrderedItemModelBuilderService = require('./services/OrderedItemModelBuilderService');
var OrderedItemModelIteratorService = require('./services/OrderedItemModelIteratorService');

module.exports = angular.module('store.selection', [])
  .controller('StoreSelectionCtrl', MainCtrl)
  .service('OrderedItemModelBuilderService', OrderedItemModelBuilderService)
  .service('OrderedItemModelIteratorService', OrderedItemModelIteratorService)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/theke/artikel/:articleId', {
        templateUrl: 'modules/store/selection/templates/index.html',
        controller: 'StoreSelectionCtrl',
        resolve: {
          orderedItemModel: ['ArticleModelFactory', '$route', 'OrderedItemModelBuilderService', '$q',
            function(ArticleModelFactory, $route, OrderedItemModelBuilderService, $q) {

              var defer = $q.defer();

              var articleModel = ArticleModelFactory.get({
                storeAlias: $route.current.params.storeAlias,
                articleId: $route.current.params.articleId
              });

              articleModel.$promise.then(function() {
                defer.resolve(OrderedItemModelBuilderService.buildWithArticle(articleModel));
              });

              return defer.promise;

            }
          ],
        }
      });

      $routeProvider.when('/:storeAlias/theke/menu/:menuId', {
        templateUrl: 'modules/store/selection/templates/index.html',
        controller: 'StoreSelectionCtrl',
        resolve: {
          orderedItemModel: ['MenuBundleModelFactory', '$route', 'OrderedItemModelBuilderService',
            function(MenuBundleModelFactory, $route, OrderedItemModelBuilderService) {

              var menuBundleModel = MenuBundleModelFactory.get({
                storeAlias: $route.current.params.storeAlias,
                menuId: $route.current.params.menuId
              });

              return OrderedItemModelBuilderService.buildWithMenuBundle(menuBundleModel);

            }
          ],
        }
      });

    }
  ]);
