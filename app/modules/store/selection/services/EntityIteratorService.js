'use strict';

module.exports = ['EntityCheckerService', 'ArticleIteratorService', 'MenuIteratorService', '$q',

  function(EntityCheckerService, ArticleIteratorService, MenuIteratorService, $q) {

    return {

      _orderedItemModel: null,
      _currentIterator: null,

      init: function(orderedItemModel) {
        this._orderedItemModel = orderedItemModel;

        // if the length is equals one the orderetItem is a article otherwise it is a menu
        if (orderedItemModel.articlesCollection.length == 1) {
          this._currentIterator = ArticleIteratorService.init(orderedItemModel.articlesCollection[0]);
        } else {
          this._currentIterator = MenuIteratorService.init(orderedItemModel);
        }

        this._currentOrderedArticleModelIndex = 0;
        this._currentIngredientCategoryModelIndex = 0;
        this._adjust();
      },
      next: function() {
        //        if (!this._currentIterator.next()) {
        //          console.log('Done!');
        //        }
        return this._currentIterator.next();
      },

      getNextEntity: function() {
        return this._currentIterator.getNextEntity();
      },

      getEntity: function() {
        return this._currentIterator.getEntity();
      },

      hasEntity: function() {
        return this._currentIterator.hasEntity();
      },

      getType: function() {
        return this._currentIterator.getType();
      },

      getArticle: function() {
        return this._currentIterator.getArticle();
      },

      jumpToEntity: function(entity) {
        this.init(this._orderedItemModel);

        var defer = $q.defer();
        var self = this;
        var entity = entity;

        var loop = function() {
          self.getEntity().then(function(currentEntity) {
            if (currentEntity === null) {
              throw 'Error! Entity not Found!';
            }
            if (entity === currentEntity) {
              defer.resolve(true);
              return true;
            } else {
              self.next().then(function() {
                loop();
              });
            }
          });
        };

        loop();
        return defer.promise;
      },

      getEntityCollection: function() {
        return this._currentIterator.getEntityCollection();
      },

      getMenuUpgradeArticle: function() {
        return this._currentIterator.getMenuUpgradeArticle();
      },

      getOrderedItemModel: function() {
        return this._orderedItemModel;
      },

      _adjust: function() {

        //        var orderedArticleModel = this._orderedItemModel.orderedArticlesCollection[this._currentOrderedArticleModelIndex];

        //        this._currentEntity = orderedArticleModel.articleModel.ingredientCategoriesCollection[this._currentIngredientCategoryModelIndex];
        //        this._currentType = 'ingredient';

      },

    };

  }
];
