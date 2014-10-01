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
        var date = new Date(2014, 8, 8, 13, 0, 0, 0);
        ClockService.init($scope.storeModel.deliveryTimesCollection, date, $scope.deliveryAreaModel.minimumDuration);

        $scope.orderMinutes = ClockService.getEarliestDeliveryTime();
        $scope.storeIsDelivering = ClockService.getNextOpeningHour();

        $scope.minutesUp = function() {
          if ($scope.orderMinutes + 5 <= ClockService.getLatestDeliveryTime()) {
            $scope.orderMinutes += 5;
          }
        };

        $scope.minutesDown = function() {
          if ($scope.orderMinutes - 5 >= ClockService.getEarliestDeliveryTime()) {
            $scope.orderMinutes -= 5;
          }
        };

        $scope.hoursUp = function() {
          if ($scope.orderMinutes + 60 <= ClockService.getLatestDeliveryTime()) {
            $scope.orderMinutes += 60;
          }
        };

        $scope.hoursDown = function() {
          if ($scope.orderMinutes - 60 >= ClockService.getEarliestDeliveryTime()) {
            $scope.orderMinutes -= 60;
          }
        };

      }
    };

  }
];
