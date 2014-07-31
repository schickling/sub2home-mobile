'use strict';

module.exports = ['$q',

  function($q) {

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
        var defer = $q.defer();

        if (this._currentIngredientCategoryIndex >= this._ingredientCategories.length) {
          defer.resolve(null);
        } else {
          defer.resolve(this._ingredientCategories[this._currentIngredientCategoryIndex + 1]);
        }

        return defer.promise;
      },

      hasNextEntity: function() {
        return this._currentIngredientCategoryIndex + 1  < this._ingredientCategories.length;
      },

      getEntity: function() {
        var defer = $q.defer();

        if (this._currentIngredientCategoryIndex === this._ingredientCategories.length) {
          defer.resolve(null);
        } else {
          defer.resolve(this._ingredientCategories[this._currentIngredientCategoryIndex]);
        }

        return defer.promise;
      },

      hasEntity: function() {
        return this._currentIngredientCategoryIndex < this._ingredientCategories.length;
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
