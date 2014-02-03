'use strict';

angular.module('mobile.controllers', [])
  .controller('HomeInfoCtrl', ['$scope',
    function($scope) {
      new window.Imager({
        availablePixelRatios: [1, 2]
      });
      $scope = $scope;
    }
  ]);