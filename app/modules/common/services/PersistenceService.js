'use strict';

module.exports = ['localStorageService',

  function(localStorageService) {

    return {

      save: function(key, value) {
        localStorageService.set(key, value);
      },

      remove: function(key) {
        localStorageService.remove(key);
      },

      load: function(key) {
        return localStorageService.get(key);
      },

    };

  }
];
