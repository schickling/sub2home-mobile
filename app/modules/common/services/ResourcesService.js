'use strict';

module.exports = ['$http', 'ApiService',

  function($http, ApiService) {

    return {

      get: function(fragment) {

        var url = ApiService.buildUrl(fragment);

        var promise = $http({
          method: 'GET',
          url: url,
        });

        promise.success(function(data) {
          return data;
        });

        return promise;

      }

    }
  }
];