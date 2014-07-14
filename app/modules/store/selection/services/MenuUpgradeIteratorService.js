'use strict';

module.exports = [

  function() {

    return {

      _menuUpgrades: null,
      _currentMenuUpgradeIndex: -1,

      init: function(menuUpgrades) {
       this._menuUpgrades = menuUpgrades;

       return this;
      },

      next: function() {
        if (this.getNextEntity() !== undefined) {
          this._currentMenuUpgradeIndex++;
          return this._menuUpgrades[this._currentMenuUpgradeIndex];
        } else {
          this._currentMenuUpgradeIndex = this._menuUpgrades.length;
          return undefined;
        }


      },

      getNextEntity: function() {
        if (this._currentMenuUpgradeIndex + 1 === this._menuUpgrades.length) {
          return undefined;
        }

        return this._menuUpgrades[this._currentMenuUpgradeIndex + 1];
      },

      getEntity: function() {
        if (this._currentMenuUpgradeIndex === this._menuUpgrades.length) {
          return undefined;
        }

        return this._menuUpgrades[this._currentMenuUpgradeIndex];
      },

      jumpToEntity: function(entity) {

      },

      getType: function() {
        return 'menuUpgrade';
      }
    };

  }
];
