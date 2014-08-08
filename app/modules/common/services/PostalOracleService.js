'use strict';

var zipcoder = require('zipcoder');

module.exports = ['localStorageService', '$q',

  function(localStorageService, $q) {

    return {

      query: function(overwritePostal) {

        var defer = $q.defer();
        var self = this;
        var postal = localStorageService.get('postal');

        if (postal && !overwritePostal) {
          defer.resolve(postal);
        } else {
          zipcoder.location(function(result) {
            if (result) {
              self.set(result.zipcode);
              defer.resolve(result.zipcode);
            } else {
              defer.reject();
            }
          });
        }

        return defer.promise;

      },

      set: function(postal) {
        localStorageService.set('postal', postal);
      },

    };

  }
];
