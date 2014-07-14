'use strict';

module.exports = ['EntityCheckerService', 'ArticleIteratorService',

  function(EntityCheckerService, ArticleIteratorService) {

    return {

      _orderedItemModel: null,
      _currentIterator: null,

      init: function(orderedItemModel) {
        this._orderedItemModel = orderedItemModel;

        switch('article') {
          case 'article':
                this._currentIterator = ArticleIteratorService.init(orderedItemModel);
                break;
          case 'menu':

                break;
        }


        this._currentOrderedArticleModelIndex = 0;
        this._currentIngredientCategoryModelIndex = 0;
        this._adjust();
      },
      next: function() {
        if (!this._currentIterator.next()) {
          console.log('Done!');
        }
      },

      getNextEntity: function() {
        return this._currentIterator.getNextEntity();
      },

      getEntity: function() {
        return this._currentIterator.getEntity();
      },

      getType: function() {
        return this._currentIterator.getType();
      },

      getArticleModel: function() {
        return this._orderedItemModel.orderedArticlesCollection[this._currentOrderedArticleModelIndex].articleModel;
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

        var orderedArticleModel = this._orderedItemModel.orderedArticlesCollection[this._currentOrderedArticleModelIndex];

        this._currentEntity = orderedArticleModel.articleModel.ingredientCategoriesCollection[this._currentIngredientCategoryModelIndex];
        this._currentType = 'ingredient';

      },

    };

  }
];
