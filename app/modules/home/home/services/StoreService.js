'use strict';

module.exports = ['$http',
  function($http) {
    this.get = function() {
      var promise = $http({
        method: 'GET',
        url: 'api/stores'
      }).success(function(data, status, headers, config) {
        return data;
      });
      return promise;
    }
  }
];