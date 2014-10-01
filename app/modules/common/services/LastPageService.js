'use strict';

module.exports = ['PersistenceService',

  function(PersistenceService) {

    return {

      set: function(title) {
        PersistenceService.save('last-page', title);
      },

      get: function() {
        return PersistenceService.load('last-page') || '';
      }


    };

  }
];
