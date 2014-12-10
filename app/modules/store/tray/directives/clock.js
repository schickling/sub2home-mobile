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
        var openingHours = new OpeningHoursFactory($scope.storeModel.deliveryTimesCollection);

        var update = function(newOrderDate) {

          if (newOrderDate) {
            $scope.orderDate = newOrderDate;
          }
        };

        var date = ServerTime.getServerTime();
        var minutes = DateUtilsService.roundToNext(date.getMinutes() + $scope.deliveryAreaModel.minimumDuration, 5);
        date.setMinutes(minutes);
        date = openingHours.getNextDate(date, 7);
        update(date);


        //date.setMinutes(date.getMinutes() + minimumDuration);
        $scope.minimumDurartion = $scope.deliveryAreaModel.minimumDuration;


        $scope.minutesUp = function() {
          var newOrderDate = openingHours.getNextDate($scope.orderDate, 7);
          update(DateUtilsService.addMinutes(newOrderDate, 5));
        };

        $scope.minutesDown = function() {
          var newOrderDate = openingHours.getPreviousDate($scope.orderDate, 7);
          update(DateUtilsService.addMinutes(newOrderDate, -5));
        };

        $scope.hoursUp = function() {
          var newOrderDate = openingHours.getNextDate($scope.orderDate, 7);
          update(DateUtilsService.addMinutes(newOrderDate, 60));
        };

        $scope.hoursDown = function() {
          var newOrderDate = openingHours.getPreviousDate($scope.orderDate, 7);
          update(DateUtilsService.addMinutes(newOrderDate, -60));
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
