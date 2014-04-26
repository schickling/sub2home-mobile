'use strict';

module.exports = ['$http',
  function($http) {
    this.get = function() {
      var promise = $http({
        method: 'GET',
        url: 'https://' + window.location.hostname + ':1070/stores'
      }).success(function(data) {
        return data;
      });
      return promise;
    };
  }
];