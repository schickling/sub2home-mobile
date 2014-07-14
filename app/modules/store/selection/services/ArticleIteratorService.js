'use strict';

module.exports = ['EntityCheckerService', 'IngredientIteratorService', 'MenuUpgradeIteratorService',

  function(EntityCheckerService, IngredientIteratorService, MenuUpgradeIteratorService) {

    return {

      _orderedArticleModel: null,
      _ingredientIterator: null,
      _menuUpgradeIterator: null,

      init: function(orderedArticleModel) {
        this._orderedArticleModel = orderedArticleModel.orderedArticlesCollection[0].articleModel;

        if(this._orderedArticleModel.allowsIngredients) {
          this._ingredientIterator = IngredientIteratorService.init(this._orderedArticleModel.ingredientCategoriesCollection);
        }

        if(this._orderedArticleModel.allowsMenuUpgrades) {
          this._menuUpgradeIterator = MenuUpgradeIteratorService.init(this._orderedArticleModel.menuUpgradesCollection);
        }

        return this;

      },

      next: function() {
        var entity = undefined;

        if (this._ingredientIterator !== null )  {
          entity = this._ingredientIterator.next();
        }

        if (this._menuUpgradeIterator !== null && entity === undefined) {
          entity = this._menuUpgradeIterator.next();
        }

        return entity;
      },

      getNextEntity: function() {
        if (this._ingredientIterator === null) {
          return undefined;
        }
        var entity = this._ingredientIterator.getNextEntity();

        if (entity === undefined && this._menuUpgradeIterator !== null) {
          entity = this._menuUpgradeIterator.getNextEntity();
        }

        return entity;
      },

      getEntity: function() {
        if (this._ingredientIterator === null) {
          return undefined;
        }

        var entity = this._ingredientIterator.getEntity();

        if (entity === undefined && this._menuUpgradeIterator !== null) {
          entity = this._menuUpgradeIterator.getEntity();
        }

          return entity;

      },

      getType: function() {
        if (this._ingredientIterator !== null && this._ingredientIterator.getEntity() !== undefined) {
          return this._ingredientIterator.getType();
        }

       if (this._menuUpgradeIterator !== null && this._menuUpgradeIterator.getEntity() !== undefined) {
          return this._menuUpgradeIterator.getType();
       }

        return undefined;
      },

      jumpToEntity: function(entity) {

      },


    };

  }
];
