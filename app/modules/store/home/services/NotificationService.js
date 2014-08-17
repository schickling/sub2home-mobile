'use strict';

module.exports = ['$timeout',

  function($timeout) {

    return {

      _storeHomeNotification: true,

      getStoreHomeNotification: function() {
        return this._storeHomeNotification;
      },

      removeStoreHomeNotification: function() {
        this._storeHomeNotification = false;
      },

      setStoreHomeNotification: function() {
        this._storeHomeNotification = true;
      },

      _trayNotification: null,

      getTrayNotification: function() {
        return this._trayNotification;
      },

      setTrayNotification: function(text) {
        this._trayNotification = text;
      },

      removeTrayNotification: function() {
        this._trayNotification = null;
      }

    };

  }
];
