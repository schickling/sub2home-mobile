'use strict';

module.exports = ['_', '$q',

  function(_, $q) {

    return {

      _menuUpgrades: null,

      // 0 return all menus as next entity
      _menuUpgradeIndex: null,
      _menuUpgradeArticleIndex: null,

      _getSelected: function() {
        var result = null;
        angular.forEach(this._menuUpgrades, function(menu) {
          if (menu.isSelected) {
            result = menu;
          }
        });

        return result;
      },

      init: function(menuUpgrades) {
        this._menuUpgrades = menuUpgrades;
        this._menuUpgradeIndex = 0;
        this._menuUpgradeArticleIndex = -1;

        return this;
      },

      next: function() {
        var next = this.getNextEntity();

        this._menuUpgradeIndex++;
        if (next) {
          this._menuUpgradeArticleIndex++;
        }

        return next;
      },

      getNextEntity: function() {
        var defer = $q.defer();

        if (this._menuUpgradeIndex === 0) {
          defer.resolve(this._menuUpgrades);
        } else {
          var selectedUpgradeMenu = this._getSelected();
          if (selectedUpgradeMenu && this._menuUpgradeArticleIndex + 1 < selectedUpgradeMenu.menuComponentBlocksCollection.length) {
            defer.resolve(selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex + 1]);
          } else {
            defer.resolve(null);
          }
        }


        return defer.promise;
      },

      hasNextEntity: function() {
        return this._menuUpgradeIndex === 0 || this._getSelected();
      },

      getEntity: function() {
        var defer = $q.defer();

        // returns all menu upgrades of the article
        if (this._menuUpgradeIndex === 0) {
          defer.resolve(this._menuUpgrades);
        } else {
          // returns all the articles of the current menuComponentBlocks as one collection
          var selectedUpgradeMenu = this._getSelected();
          if (selectedUpgradeMenu && this._menuUpgradeArticleIndex < selectedUpgradeMenu.menuComponentBlocksCollection.length) {
            var tmp = {};
            tmp.menuComponentBlockMediaModel = selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex].menuComponentBlockMediaModel;
            tmp.menuComponentOptionArticlesCollection = [];
            angular.forEach(selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex].menuComponentOptionsCollection, function(collection) {
              tmp.menuComponentOptionArticlesCollection = _.union(tmp.menuComponentOptionArticlesCollection, collection.menuComponentOptionArticlesCollection);
            });
            defer.resolve(tmp);
          } else {
            defer.resolve(null);
          }
        }

        return defer.promise;
      },

      hasEntity: function() {
        return this._menuUpgradeIndex === 0 || this._getSelected();
      },

      jumpToEntity: function(entity) {

      },

      getType: function() {
        var defer = $q.defer();

        if (this._menuUpgradeIndex < 1) {
          defer.resolve('menuUpgrade');
        } else {
          defer.resolve('menuUpgradeArticle');
        }

        return defer.promise;
      },

      getMenuUpgradeArticle: function() {
        var result = [];
        var selectedMenu = this._getSelected();

        if (selectedMenu) {
          _.forEach(selectedMenu.menuComponentBlocksCollection, function(article) {
            result.push(article);
          });
        }

        return result;
      }
    };

  }
];
