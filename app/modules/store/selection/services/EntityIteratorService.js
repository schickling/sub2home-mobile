'use strict';

module.exports = ['EntityCheckerService', 'ArticleIteratorService', 'MenuIteratorService',

  function(EntityCheckerService, ArticleIteratorService, MenuIteratorService) {

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

      getIsFetching: function() {
        return this._currentIterator.getIsFetching();
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

        if (!EntityCheckerService.isCompled(this._currentEntity)) {
          return;
        }

        for (var orderedArticleModelIndex = 0; orderedArticleModelIndex < this._orderedItemModel.orderedArticlesCollection.length; ++orderedArticleModelIndex) {

          var orderedArticleModel = this._orderedItemModel.orderedArticlesCollection[orderedArticleModelIndex];
          var ingredientCategoriesCollection = orderedArticleModel.articleModel.ingredientCategoriesCollection;

          for (var ingredientCategoryModelIndex = 0; ingredientCategoryModelIndex < ingredientCategoriesCollection.length; ++ingredientCategoryModelIndex) {
            if (entity === ingredientCategoriesCollection[ingredientCategoryModelIndex]) {
              this._currentOrderedArticleModelIndex = orderedArticleModelIndex;
              this._currentIngredientCategoryModelIndex = ingredientCategoryModelIndex;
            }
          }
        }

        this._adjust();

      },

      _adjust: function() {

        //        var orderedArticleModel = this._orderedItemModel.orderedArticlesCollection[this._currentOrderedArticleModelIndex];

        //        this._currentEntity = orderedArticleModel.articleModel.ingredientCategoriesCollection[this._currentIngredientCategoryModelIndex];
        //        this._currentType = 'ingredient';

      },

    };

  }
];
