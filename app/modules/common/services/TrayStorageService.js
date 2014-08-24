'use strict';

module.exports = ['ItemStorageService', '_', 'ArticleHelper',

  function(ItemStorageService, _, ArticleHelper) {

    return {

      _singleItemKey: 'traySingleItem',
      _menuItemKey: 'trayMenuItem',
      _subItemKey: 'traySubItem',

      removeAll: function() {
        ItemStorageService.removeAllItems(this._singleItemKey);
        ItemStorageService.removeAllItems(this._menuItemKey);
        ItemStorageService.removeAllItems(this._subItemKey);
      },

      // single items
      saveSingleItem: function(singleItem) {
        // calculate the cost of the item
        singleItem.finalPrice = singleItem.price;

        //save the item to localstorage
        ItemStorageService.saveItem(this._singleItemKey, singleItem);
      },

      getAllSingleItems: function() {
        return ItemStorageService.getAllItems(this._singleItemKey);
      },

      removeSingleItem: function(singleItem) {
        ItemStorageService.removeItem(this._singleItemKey, singleItem);
      },

      // sub items
      saveSubItem: function(subItem) {
        subItem.finalPrice = ArticleHelper.getExtraCostOfArticle(subItem);
        subItem.finalPrice += subItem.price;

        ItemStorageService.saveItem(this._subItemKey, subItem);
      },

      getAllSubItems: function() {
        return ItemStorageService.getAllItems(this._subItemKey);
      },

      removeSubItem: function(subItem) {
        ItemStorageService.removeItem(this._subItemKey, subItem);
      },

      // menu items
      saveMenuItem: function(menuItem) {
        // get selected article form articles without ingrediants
        _.forEach(menuItem.articlesCollection, function(article) {
          if (!article.savedArticle || (article.savedArticle && !article.savedArticle.allowsIngredients)) {
            article.savedArticle = ArticleHelper.getSelectedArticle(article);
          }
        });

        if (menuItem.menuUpgradePrice) {
          // MenuUpgrade

          menuItem.deposit = menuItem.articlesCollection.reduce(function(sum, model) {
            return sum + model.savedArticle.deposit;
          }, 0);

          var subItem = menuItem.articlesCollection[0].savedArticle;
          menuItem.finalPrice = ArticleHelper.getExtraCostOfArticle(subItem);
          menuItem.finalPrice += menuItem.articlesCollection[menuItem.articlesCollection.length - 1].menuPrice;
          menuItem.finalPrice += subItem.price;
        } else {
          //MenuBundle
          menuItem.deposit = 0;
          menuItem.finalPrice = menuItem.menuBundleModel.price;
          _.forEach(menuItem.articlesCollection, function(article) {
            menuItem.finalPrice += ArticleHelper.getExtraCostOfArticle(article.savedArticle);
            menuItem.deposit += article.savedArticle.deposit;
          });
        }
        ItemStorageService.saveItem(this._menuItemKey, menuItem);
      },

      getAllMenuItems: function() {
        return ItemStorageService.getAllItems(this._menuItemKey);
      },

      removeMenuItem: function(menuItem) {
        ItemStorageService.removeItem(this._menuItemKey, menuItem);
      },

      getAllItems: function() {
        var singleItems = this.getAllSingleItems();
        var subItems = this.getAllSubItems();
        var menuIems = this.getAllMenuItems();
        return _.union(singleItems, subItems, menuIems);
      },
    };

  }

];
