'use strict';

module.exports = [

  function() {

    return {

      _ingredientCategories: null,
      _currentIngredientCategoryIndex: 0,

      init: function(ingredientCategories) {
       this._ingredientCategories = ingredientCategories;

       return this;
      },

      next: function() {
        var next = this.getNextEntity();
        this._currentIngredientCategoryIndex++;

        return next;
      },

      prev: function() {

      },

      getNextEntity: function() {
        if (this._currentIngredientCategoryIndex >= this._ingredientCategories.length) {
          return undefined;
        }

        return this._ingredientCategories[this._currentIngredientCategoryIndex + 1];
      },

      getEntity: function() {
        if (this._currentIngredientCategoryIndex === this._ingredientCategories.length) {
          return undefined;
        }

        return this._ingredientCategories[this._currentIngredientCategoryIndex];
      },

      jumpToEntity: function(entity) {

      },

      getType: function() {
        return 'ingredient';
      },

      _adjust: function() {

      },

    };

  }
];
