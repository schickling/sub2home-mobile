'use strict';

module.exports = ['$http', '$q', 'ApiService',

  function($http, $q, ApiService) {

    return {

      errorCallback: null,

      get: function(fragment) {

        var url = ApiService.buildUrl(fragment);
        var defer = $q.defer();

        var httpPromise = $http({
          method: 'GET',
          url: url,
        });

        httpPromise.then(function(response) {
          defer.resolve(response.data);
        });

        if (this.errorCallback) {
          httpPromise.error(this.errorCallback);
        }

        return defer.promise;

      },

      setErrorCallback: function(errorCallback) {
        this.errorCallback = errorCallback;
      },

    }
  }
];