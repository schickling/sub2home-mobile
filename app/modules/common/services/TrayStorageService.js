'use strict';

module.exports = ['ItemStorageService',

  function(ItemStorageService) {

    return {

      _singleItemKey: 'traySingleItem',
      _menuItemKey: 'trayMenuItem',
      _subItemKey: 'traySubItem',

      // single items
      saveSingleItem: function(singleItem) {
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
        ItemStorageService.saveItem(this._menuItemKey, menuItem);
      },

      getAllMenuItems: function() {
        return ItemStorageService.getAllItems(this._menuItemKey);
      },

      removeMenuItem: function(menuItem) {
        ItemStorageService.removeItem(this._menuItemKey, menuItem);
      },
    };

  }

];
