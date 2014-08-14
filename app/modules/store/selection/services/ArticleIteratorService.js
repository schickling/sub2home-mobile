'use strict';

module.exports = ['EntityCheckerService', 'IngredientIteratorService', 'MenuUpgradeIteratorService', '$q',

  function(EntityCheckerService, IngredientIteratorService, MenuUpgradeIteratorService, $q) {

    return {

      _orderedArticleModel: null,
      _ingredientIterator: null,
      _menuUpgradeIterator: null,

      init: function(orderedArticleModel) {
        this._orderedArticleModel = orderedArticleModel;

        if (this._orderedArticleModel.allowsIngredients) {
          this._ingredientIterator = IngredientIteratorService.init(this._orderedArticleModel.ingredientCategoriesCollection);
        }

        if (this._orderedArticleModel.allowsMenuUpgrades) {
          this._menuUpgradeIterator = MenuUpgradeIteratorService.init(this._orderedArticleModel.menuUpgradesCollection);
        }

        return this;

      },

      next: function() {
        var entity = null;
        // TODO hier stimmt was nicht
        if (this._ingredientIterator.hasNextEntity()) {
          entity = this._ingredientIterator.next();
        }
        if (this._menuUpgradeIterator && this._menuUpgradeIterator.hasEntity() && !entity) {
          this._ingredientIterator.next();
          entity = this._menuUpgradeIterator.next();
        }

        return entity;
      },

      hasNextEntity: function() {
        return this._ingredientIterator.hasNextEntity();
      },

      getNextEntity: function() {
        var defer = $q.defer();

        if (this._ingredientIterator) {

          if (this._ingredientIterator.hasNextEntity()) {
            return this._ingredientIterator.getNextEntity();
          } else if (this._menuUpgradeIterator) {
            return this._menuUpgradeIterator.getNextEntity();
          } else {
            defer.resolve(null);
            return defer.promise;
          }
        } else {
          defer.resolve(null);
          return defer.promise;
        }

      },

      getIsFetching: function() {
        return false;
      },
      getEntity: function() {
        var defer = $q.defer();

        if (!this._ingredientIterator) {
          defer.resolve(null);
          return defer.promise;
        } else {

          if (this._ingredientIterator.hasEntity()) {
            return this._ingredientIterator.getEntity();
          } else if (this._menuUpgradeIterator) {
            return this._menuUpgradeIterator.getEntity();
          }
        }

      },

      hasEntity: function() {
        var result = null;

        result = this._ingredientIterator.hasEntity();

        if (!result && this._menuUpgradeIterator) {
          result = this._menuUpgradeIterator.hasEntity();
        }

        return result;
      },

      getType: function() {
        var defer = $q.defer;

        if (this._ingredientIterator.hasEntity()) {
          return this._ingredientIterator.getType();
        }

        if (this._menuUpgradeIterator && this._menuUpgradeIterator.hasEntity()) {
          return this._menuUpgradeIterator.getType();
        }

        defer.resolve(null);
        return defer.promise;
      },

      getEntityCollection: function() {
        var article = this._orderedArticleModel;
        article.menuUpgradeArticles = this.getMenuUpgradeArticle();

        return [article];
      },

      getArticle: function() {
        var defer = $q.defer();
        defer.resolve(this._orderedArticleModel);

        return defer.promise;
      },

      getMenu: function() {
        return '';
      },


      getMenuUpgradeArticle: function() {
        if (this._menuUpgradeIterator) {
          return this._menuUpgradeIterator.getMenuUpgradeArticle();
        } else {
          return [];
        }
      },

    };

  }
];
