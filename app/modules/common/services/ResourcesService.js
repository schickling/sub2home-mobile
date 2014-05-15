'use strict';

module.exports = ['$http', 'ApiService',

  function($http, ApiService) {

    return {

      errorCallback: null,

      get: function(fragment) {

        var url = ApiService.buildUrl(fragment);

        var promise = $http({
          method: 'GET',
          url: url,
        });

        promise.success(function(data) {
          return data;
        });

        if (this.errorCallback) {
          promise.error(this.errorCallback);
        }

        return promise;

      },

      setErrorCallback: function(errorCallback) {
        this.errorCallback = errorCallback;
      },

    }
  }
];