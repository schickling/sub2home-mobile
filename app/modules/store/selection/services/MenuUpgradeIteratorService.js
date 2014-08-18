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
        this._menuUpgradeIndex = -1;
        this._menuUpgradeArticleIndex = -1;

        this._menuUpgrades.title = this._menuUpgrades[0].title;

        return this;
      },

      next: function() {
        var next = this.getNextEntity();

        this._menuUpgradeIndex++;

        //if (this._getSelected()) {
        if (this._menuUpgradeIndex > 0) {
          this._menuUpgradeArticleIndex++;
        }

        return next;
      },

      getNextEntity: function() {
        var defer = $q.defer();

        if (this._menuUpgradeIndex + 1 < 1) {
          defer.resolve(this._menuUpgrades);
        } else {
          var selectedUpgradeMenu = this._getSelected();
          if (selectedUpgradeMenu && this._menuUpgradeArticleIndex + 1 < selectedUpgradeMenu.menuComponentBlocksCollection.length) {
            var next = selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex + 1];
            next.title = next.menuComponentOptionsCollection[0].title;
            next.icon = next.menuComponentBlockMediaModel.icon;
            defer.resolve(next);
          } else {
            defer.resolve(null);
          }
        }


        return defer.promise;
      },

      hasNextEntity: function() {
        return this._menuUpgradeIndex < 1 || this._getSelected();
      },

      getEntity: function() {
        var defer = $q.defer();

        // returns all menu upgrades of the article
        if (this._menuUpgradeIndex < 1) {
          defer.resolve(this._menuUpgrades);
        } else {
          // returns all the articles of the current menuComponentBlocks as one collection
          var selectedUpgradeMenu = this._getSelected();
          if (selectedUpgradeMenu && this._menuUpgradeArticleIndex < selectedUpgradeMenu.menuComponentBlocksCollection.length) {
            defer.resolve(selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex]);

            //if (selectedUpgradeMenu && this._menuUpgradeArticleIndex < selectedUpgradeMenu.menuComponentBlocksCollection.length) {
            //var tmp = {};
            //tmp.menuComponentBlockMediaModel = selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex].menuComponentBlockMediaModel;
            //tmp.menuComponentOptionArticlesCollection = [];
            //angular.forEach(selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex].menuComponentOptionsCollection, function(collection) {
            //tmp.menuComponentOptionArticlesCollection = _.union(tmp.menuComponentOptionArticlesCollection, collection.menuComponentOptionArticlesCollection);
            //});
            //defer.resolve(tmp);
          } else {
            defer.resolve(null);
          }
        }

        return defer.promise;
      },

      hasEntity: function() {
        return this._menuUpgradeIndex < 1 || this._getSelected();
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
            //add the price of the menu to the articles
            article.menuPrice = selectedMenu.price;
            result.push(article);
          });
        }

        return result;
      }
    };

  }
];
