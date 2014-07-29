'use strict';

module.exports = ['EntityCheckerService', 'IngredientIteratorService', 'MenuUpgradeIteratorService',

  function(EntityCheckerService, IngredientIteratorService, MenuUpgradeIteratorService) {

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

        if (this._ingredientIterator)  {
          entity = this._ingredientIterator.next();
        }

        if (this._menuUpgradeIterator && !entity) {
          entity = this._menuUpgradeIterator.next();
        }

        return entity;
      },

      getNextEntity: function() {
        if (!this._ingredientIterator) {
          return undefined;
        }
        var entity = this._ingredientIterator.getNextEntity();

        if (!entity && this._menuUpgradeIterator) {
          entity = this._menuUpgradeIterator.getNextEntity();
        }

        return entity;
      },

      getEntity: function() {
        if (!this._ingredientIterator) {
          return null;
        }

        var entity = this._ingredientIterator.getEntity();

        if (!entity && this._menuUpgradeIterator) {
          entity = this._menuUpgradeIterator.getEntity();
        }

          return entity;

      },

      getType: function() {
        if (this._ingredientIterator && this._ingredientIterator.getEntity()) {
          return this._ingredientIterator.getType();
        }

       if (this._menuUpgradeIterator && this._menuUpgradeIterator.getEntity()) {
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
