'use strict';

module.exports = ['PersistenceService',

  function(PersistenceService) {

    return {

      set: function(path, title) {
        PersistenceService.save('last-page', {
          path: path,
          title: title
        });
      },

      get: function() {
        return PersistenceService.load('last-page') || {
          path: '/',
          title: 'Startseite'
        };
      }


    };

  }
];
