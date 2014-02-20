'use strict';

angular.module('mobile.controllers', [])
  .controller('HomeInfoCtrl', ['$scope', '$location', '$anchorScroll',
    function($scope, $location, $anchorScroll) {

      new window.Imager({
        availablePixelRatios: [1, 2]
      });

      $scope.offset = 0;
      $scope.width = 241;

      $scope.increaseOffset = function() {
        if ($scope.offset < 4) {
          $scope.offset++;
        }
      };

      $scope.decreaseOffset = function() {
        if ($scope.offset > 0) {
          $scope.offset--;
        }
      };

    }
  ]);