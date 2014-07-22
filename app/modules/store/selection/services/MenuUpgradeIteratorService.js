'use strict';

module.exports = [ '_',

  function(_) {

    return {

      _menuUpgrades: null,

      // 0 return all menus as next entity
      _menuUpgradeIndex: null,
      _menuUpgradeArticleIndex: null,

      _getSelected: function() {
        var result = null;
        angular.forEach(this._menuUpgrades, function(menu) {
          if (menu.isSelected) {
            result =  menu;
          }
        });

        return result;
      },

      init: function(menuUpgrades) {
       this._menuUpgrades = menuUpgrades;
       this._menuUpgradeIndex = -1;
       this._menuUpgradeArticleIndex = -1;

       return this;
      },

      next: function() {
        var next = this.getNextEntity();

        this._menuUpgradeIndex++;
        if (Object.prototype.toString.call(next) === '[object Array]') {
        //  this._menuUpgradeIndex++;
        } else if (next) {
          this._menuUpgradeArticleIndex++;
        }

        return next;
      },

      getNextEntity: function() {
        if (this._menuUpgradeIndex + 1  === 0) {
          return this._menuUpgrades;
        }

        var selectedUpgradeMenu = this._getSelected();
        if (selectedUpgradeMenu && this._menuUpgradeArticleIndex + 1 < selectedUpgradeMenu.menuComponentBlocksCollection.length) {
          return selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex + 1];
        } else {
          return null;
        }


      },

      getEntity: function() {
        // returns all menu upgrades of the article
        if (this._menuUpgradeIndex === 0) {
          return this._menuUpgrades;
        }


        // returns all the articles of the current menuComponentBlocks as one collection
        var selectedUpgradeMenu = this._getSelected();
        if (selectedUpgradeMenu && this._menuUpgradeArticleIndex < selectedUpgradeMenu.menuComponentBlocksCollection.length) {
          var tmp = [];
          angular.forEach(selectedUpgradeMenu.menuComponentBlocksCollection[this._menuUpgradeArticleIndex].menuComponentOptionsCollection, function(collection) {
            tmp = _.union(tmp, collection.menuComponentOptionArticlesCollection);
          });
          return tmp;
        }

        return null;

      },

      jumpToEntity: function(entity) {

      },

      getType: function() {
        if (this._menuUpgradeIndex < 1) {
          return 'menuUpgrade';
        } else {
          return 'menuUpgradeArticle';
        }
      }
    };

  }
];
