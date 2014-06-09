'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var OrderedItemModelBuilderService = require('./services/OrderedItemModelBuilderService');

module.exports = angular.module('store.selection', [])
  .controller('StoreSelectionCtrl', MainCtrl)
  .service('OrderedItemModelBuilderService', OrderedItemModelBuilderService)
  .config(['$routeProvider',
    function($routeProvider) {

      $routeProvider.when('/:storeAlias/theke/artikel/:articleId', {
        templateUrl: 'modules/store/selection/templates/index.html',
        controller: 'StoreSelectionCtrl',
        resolve: {
          orderedItemModel: ['ArticleModelFactory', '$route', 'OrderedItemModelBuilderService',
            function(ArticleModelFactory, $route, OrderedItemModelBuilderService) {

              var articleModel = ArticleModelFactory.get({
                storeAlias: $route.current.params.storeAlias,
                articleId: $route.current.params.articleId
              });

              return OrderedItemModelBuilderService.buildWithArticle(articleModel);

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