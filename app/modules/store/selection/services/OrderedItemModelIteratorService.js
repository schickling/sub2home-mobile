'use strict';

module.exports = [

  function() {

    return {

      _orderedItemModel: null,
      _currentOrderedArticleModelIndex: null,
      _currentIngredientCategoryModelIndex: null,
      _currentEntity: null,
      _currentType: null,

      init: function(orderedItemModel) {
        this._orderedItemModel = orderedItemModel;
        this._currentOrderedArticleModelIndex = 0;
        this._currentIngredientCategoryModelIndex = 0;
        this._adjust();
      },

      next: function() {
        
        var orderedArticleModel = this._orderedItemModel.orderedArticlesCollection[this._currentOrderedArticleModelIndex];
        var numberOfIngredientCategoryModels = orderedArticleModel.articleModel.ingredientCategoriesCollection.length;

        this._currentIngredientCategoryModelIndex++;

        this._adjust();

      },

      prev: function() {

        this._currentIngredientCategoryModelIndex--;

        this._adjust();

      },

      getEntity: function() {
        return this._currentEntity;
      },

      getType: function() {
        return this._currentType;
      },

      _adjust: function() {

        var orderedArticleModel = this._orderedItemModel.orderedArticlesCollection[this._currentOrderedArticleModelIndex];

        this._currentEntity = orderedArticleModel.articleModel.ingredientCategoriesCollection[this._currentIngredientCategoryModelIndex];
        this._currentType = 'ingredient';

      },

    };

  }
];
