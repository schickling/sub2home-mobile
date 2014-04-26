'use strict';

module.exports = ['$http',
  function($http) {
    this.get = function() {
      var promise = $http({
        method: 'GET',
        url: 'http://' + window.location.hostname + ':1071/stores'
      }).success(function(data) {
        return data;
      });
      return promise;
    };
  }
];