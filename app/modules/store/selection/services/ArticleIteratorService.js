'use strict';

module.exports = ['EntityCheckerService', 'IngredientIteratorService', 'MenuUpgradeIteratorService', '$q',

  function(EntityCheckerService, IngredientIteratorService, MenuUpgradeIteratorService, $q) {

    return {

      _orderedArticleModel: null,
      _ingredientIterator: null,
      _menuUpgradeIterator: null,

      init: function(orderedArticleModel) {
        this._orderedArticleModel = orderedArticleModel;

        if(this._orderedArticleModel.allowsIngredients) {
          this._ingredientIterator = IngredientIteratorService.init(this._orderedArticleModel.ingredientCategoriesCollection);
        }

        if(this._orderedArticleModel.allowsMenuUpgrades) {
          this._menuUpgradeIterator = MenuUpgradeIteratorService.init(this._orderedArticleModel.menuUpgradesCollection);
        }

        return this;

      },

      next: function() {
        var entity = null;

        if (this._ingredientIterator.hasEntity())  {
          entity = this._ingredientIterator.next();
        }

        if (this._menuUpgradeIterator.hasEntity() && !entity) {
          entity = this._menuUpgradeIterator.next();
        }

        return entity;
      },

      getNextEntity: function() {
        var defer = $q.defer();

        if (!this._ingredientIterator) {
          defer.resolve(null);
          return defer.promise;

        } else {
          if (this._ingredientIterator.hasNextEntity()) {
            return this._ingredientIterator.getNextEntity();
          } else {
            return this._menuUpgradeIterator.getNextEntity();
          }
        }

      },

      getEntity: function() {
        var defer = $q.defer();

        if (!this._ingredientIterator) {
          defer.resolve(null);
          return defer.promise;
        } else {

          if (this._ingredientIterator.hasEntity()) {
            return this._ingredientIterator.getEntity();
          } else {
            return this._menuUpgradeIterator.getEntity();
          }
        }

      },

      getType: function() {
        if (this._ingredientIterator.hasEntity()) {
          return this._ingredientIterator.getType();
        }

       if (this._menuUpgradeIterator.hasEntity()) {
          return this._menuUpgradeIterator.getType();
       }

        return undefined;
      },

      getArticle: function() {
        return this._orderedArticleModel;
      },

      jumpToEntity: function(entity) {

      },


    };

  }
];
