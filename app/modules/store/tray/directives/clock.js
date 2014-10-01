'use strict';

module.exports = ['_', 'ClockService',

  function(_, ClockService) {
    return {
      restrict: 'E',
      scope: {
        deliveryAreaModel: '=deliveryAreaModel',
        storeModel: '=storeModel',
        orderMinutes: '=orderMinutes',
      },

      templateUrl: 'modules/store/tray/directives/clock.html',
      link: function($scope, $elem, $attrs) {

//        var date = new Date();
        var date = new Date(2014, 8, 8, 12, 0, 0, 0);
        ClockService.init($scope.storeModel.deliveryTimesCollection, date, $scope.deliveryAreaModel.minimumDuration);

        $scope.orderMinutes = ClockService.getEarliestDeliveryTime();
        $scope.storeIsDelivering = ClockService.getNextOpeningHour();

        $scope.latestDeliveryTime = ClockService.getLatestDeliveryTime();
        $scope.earliestDeliveryTime = ClockService.getEarliestDeliveryTime();

        $scope.minutesUp = function() {
          $scope.latestDeliveryTime = ClockService.getLatestDeliveryTime();
          if ($scope.orderMinutes + 5 <= $scope.latestDeliveryTime) {
            $scope.orderMinutes += 5;
          }
        };

        $scope.minutesDown = function() {
          $scope.earliestDeliveryTime = ClockService.getEarliestDeliveryTime();
          if ($scope.orderMinutes - 5 >= $scope.earliestDeliveryTime) {
            $scope.orderMinutes -= 5;
          }
        };

        $scope.hoursUp = function() {
          $scope.latestDeliveryTime = ClockService.getLatestDeliveryTime();
          if ($scope.orderMinutes + 60 <= $scope.latestDeliveryTime) {
            $scope.orderMinutes += 60;
          }
        };

        $scope.hoursDown = function() {
          $scope.earliestDeliveryTime = ClockService.getEarliestDeliveryTime();
          if ($scope.orderMinutes - 60 >= $scope.earliestDeliveryTime) {
            $scope.orderMinutes -= 60;
          }
        };

      }
    };

  }
];
