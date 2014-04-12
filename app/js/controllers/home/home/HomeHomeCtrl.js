'use strict';

module.exports = angular.module('mobile.controllers', [])
  .controller('HomeHomeCtrl', ['$scope',
    function($scope) {
      $scope = $scope;
      var log = arr => console.log(arr);
      var [a, [b], c, d] = ['hello', [', ', 'junk'], ['world']];
      log(c);
    }
  ]);