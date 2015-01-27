'use strict';

var MainCtrl = require('./controllers/MainCtrl');
var OrderedItemModelBuilderService = require('./services/OrderedItemModelBuilderService');
var EntityIteratorService = require('./services/EntityIteratorService');
var ArticleIteratorService = require('./services/ArticleIteratorService');
var IngredientIteratorService = require('./services/IngredientIteratorService');
var MenuUpgradeIteratorService = require('./services/MenuUpgradeIteratorService');
var MenuIteratorService = require('./services/MenuIteratorService');
var IteratorUtilsService = require('./services/IteratorUtilsService');
var EntityCheckerService = require('./services/EntityCheckerService');
var articleDirective = require('./directives/articleDirective');

module.exports = angular.module('store.selection', [])
  .controller('StoreSelectionCtrl', MainCtrl)
  .service('OrderedItemModelBuilderService', OrderedItemModelBuilderService)
  .service('EntityIteratorService', EntityIteratorService)
  .service('ArticleIteratorService', ArticleIteratorService)
  .service('IngredientIteratorService', IngredientIteratorService)
  .service('IteratorUtilsService', IteratorUtilsService)
  .service('MenuUpgradeIteratorService', MenuUpgradeIteratorService)
  .service('MenuIteratorService', MenuIteratorService)
  .service('EntityCheckerService', EntityCheckerService)
  .directive('article', articleDirective)
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

              return articleModel.$promise.then(function() {
                return OrderedItemModelBuilderService.buildWithArticle(articleModel);
              });
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

              return menuBundleModel.$promise.then(function() {
                return OrderedItemModelBuilderService.buildWithMenuBundle(menuBundleModel);
              });

            }
          ],
        }
      });

    }
  ]);
