'use strict';

module.exports = [

  function() {
    return {
      restrict: 'E',
      scope: {
        minimumDuration: '=minimumDuration',
      },

      templateUrl: 'modules/store/tray/directives/clock.html',
      link: function($scope, $elem, $attrs) {

        $scope.hours = 0;
        $scope.minutes = 0;

        $scope.minuteUp = function() {
          $scope.minutes += 5;

          if ($scope.minutes >= 60) {
            $scope.minutes = 0;
            $scope.hourUp();
          }
        };

        $scope.minuteDown = function() {
          $scope.minuteDown -= 5;

          if ($scope.minutes <= 0) {
            $scope.minutes = 55;
            $scope.hourDown();
          }
        };

        $scope.hourUp = function() {
          $scope.hour++;
          if ($scope.hour >= 24) {
            $scope.hour = 0;
          }

        };

        $scope.hourDown = function() {
          $scope.hour--;
          if ($scope.hour <= 0) {
            $scope.hour = 23;
          }
        };

      }
    };

  }
];
