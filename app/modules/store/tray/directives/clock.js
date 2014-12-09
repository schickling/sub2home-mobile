'use strict';

module.exports = ['_', 'OpeningHoursFactory', 'ServerTime', 'DateUtilsService',

  function(_, OpeningHoursFactory, ServerTime, DateUtilsService) {
    return {
      restrict: 'E',
      scope: {
        deliveryAreaModel: '=deliveryAreaModel',
        storeModel: '=storeModel',
      },

      templateUrl: 'modules/store/tray/directives/clock.html',
      link: function($scope) {


        var update = function(newOrderDate) {
          if (newOrderDate) {
            $scope.orderDate = newOrderDate;
          }
        };

        var date = ServerTime.getServerTime();
        var openingHours = new OpeningHoursFactory($scope.storeModel.deliveryTimesCollection);

        //date.setMinutes(date.getMinutes() + minimumDuration);
        $scope.minimumDurartion = $scope.deliveryAreaModel.minimumDuration;

        update(openingHours.getNextDate(date, $scope.minimumDuration));

        $scope.minutesUp = function() {
          update(openingHours.getNextDate(DateUtilsService.addMinutes($scope.orderDate, 5)));
        };

        $scope.minutesDown = function() {
          update(openingHours.getNextDate(DateUtilsService.addMinutes($scope.orderDate, -5)));
        };

        $scope.hoursUp = function() {
          update(openingHours.getNextDate(DateUtilsService.addMinutes($scope.orderDate, 60)));
        };

        $scope.hoursDown = function() {
          update(openingHours.getNextDate(DateUtilsService.addMinutes($scope.orderDate, -60)));
        };

        var checkUnavailable = function() {

          $scope.minutesUpUnavailable = false;
          $scope.minutesDownUnavailable = false;
          $scope.hoursUpUnavailable = false;
          $scope.hoursUpUnavailable = false;

        };

        //var date = ServerTime.getServerTime();
        //ClockService.init($scope.storeModel.deliveryTimesCollection, date, $scope.deliveryAreaModel.minimumDuration);

        //$scope.orderMinutes = ClockService.getEarliestDeliveryTime();
        //$scope.storeIsDelivering = ClockService.getNextDateOpeningHour();

        //$scope.latestDeliveryTime = ClockService.getLatestDeliveryTime();
        //$scope.earliestDeliveryTime = ClockService.getEarliestDeliveryTime();

        //$scope.minutesUp = function() {
          //$scope.latestDeliveryTime = ClockService.getLatestDeliveryTime();
          //if ($scope.orderMinutes + 5 <= $scope.latestDeliveryTime) {
            //$scope.orderMinutes += 5;
          //}
        //};

        //$scope.minutesDown = function() {
          //$scope.earliestDeliveryTime = ClockService.getEarliestDeliveryTime();
          //if ($scope.orderMinutes - 5 >= $scope.earliestDeliveryTime) {
            //$scope.orderMinutes -= 5;
          //}
        //};

        //$scope.hoursUp = function() {
          //$scope.latestDeliveryTime = ClockService.getLatestDeliveryTime();
          //if ($scope.orderMinutes + 60 <= $scope.latestDeliveryTime) {
            //$scope.orderMinutes += 60;
          //}
        //};

        //$scope.hoursDown = function() {
          //$scope.earliestDeliveryTime = ClockService.getEarliestDeliveryTime();
          //if ($scope.orderMinutes - 60 >= $scope.earliestDeliveryTime) {
            //$scope.orderMinutes -= 60;
          //}
        //};

      }
    };

  }
];
