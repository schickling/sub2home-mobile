'use strict';

var zipcoder = require('zipcoder');

module.exports = ['localStorageService', '$q',

  function(localStorageService, $q) {

    return {

      query: function() {

        var defer = $q.defer();
        var self = this;
        var postal = localStorageService.get('postal');

        if (postal) {
          defer.resolve(postal);
        } else {
          zipcoder.location(function(result) {
            self.set(result.zipcode);
            defer.resolve(result.zipcode);
          });
        }

        return defer.promise;

      },

      set: function(postal) {
        localStorageService.set('postal', postal);
      }

    }
  }
];