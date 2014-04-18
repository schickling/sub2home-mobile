'use strict';

module.exports = ['$http',
  function($http) {
    this.get = function() {
      var promise = $http({
        method: 'GET',
        url: window.location.protocol + '//' + window.location.hostname + ':7777/stores'
      }).success(function(data, status, headers, config) {
        return data;
      });
      return promise;
    }
  }
];