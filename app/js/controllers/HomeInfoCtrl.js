'use strict';

angular.module('mobile.controllers', [])
  .controller('HomeInfoCtrl', ['$scope',
    function($scope) {

      new window.Imager({
        availablePixelRatios: [1, 2]
      });

      $scope.offset = 0;
      $scope.width = 238;

      $scope.increaseOffset = function() {
        $scope.offset += $scope.width;
      };

    }
  ]);
