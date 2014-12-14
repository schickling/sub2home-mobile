'use strict';

module.exports = ['_', 'OpeningHoursFactory', 'ServerTime', 'DateUtilsService',
  'PersistenceService',

  function(_, OpeningHoursFactory, ServerTime, DateUtilsService, PersistenceService) {
    return {
      restrict: 'E',
      scope: {
        deliveryAreaModel: '=deliveryAreaModel',
        openingHours: '=openingHours',
        orderDate: '=orderDate'
      },

      templateUrl: 'modules/store/tray/directives/clock.html',
      link: function($scope) {
        var daysInFuture = 0;
        var getPreviousDate = function(date, minutes) {
          var newOrderDate = DateUtilsService.addMinutes(date, minutes);
          if (newOrderDate.getTime() >= now.getTime()) {
            return $scope.openingHours.getPreviousDate(newOrderDate, daysInFuture);
          } else {
            return null;
          }
        };

        var getNextDate = function(date, minutes) {
          var newOrderDate = DateUtilsService.addMinutes(date, minutes);
          newOrderDate = $scope.openingHours.getNextDate(newOrderDate, daysInFuture);

          if (newOrderDate) {
            //TODO write datesutil function
            var maxDate = new Date(now);
            maxDate.setDate(maxDate.getDate() + daysInFuture);
            maxDate.setMinutes(59);
            maxDate.setHours(23);

            if (newOrderDate.getTime() < maxDate.getTime()) {
              newOrderDate = $scope.openingHours.getNextDate(newOrderDate,
                daysInFuture);
              return newOrderDate;

            } else {
              return null;
            }
          } else {
            return null;
          }

        };

        var checkUnavailable = function(newOrderDate) {
          //check minutes down
          if (!getPreviousDate(newOrderDate, -5)) {
            $scope.minutesDownUnavailable = true;
          } else {
            $scope.minutesDownUnavailable = false;
          }

          // check hours down
          //var hoursDownDate = new Date(newOrderDate);
          //hoursDownDate.setMinutes(hoursDownDate.getMinutes() - 59);
          //if (hoursDownDate.getTime() <= now.getTime()) {
          if (!getPreviousDate(newOrderDate, -60)) {
            $scope.hoursDownUnavailable = true;
          } else {
            $scope.hoursDownUnavailable = false;
          }

          // check minutes up
          if (!getNextDate(newOrderDate, 5)) {
            $scope.minutesUpUnavailable = true;
          } else {
            $scope.minutesUpUnavailable = false;
          }

          // check hours up
          if (!getNextDate(newOrderDate, 60)) {
            $scope.hoursUpUnavailable = true;
          } else {
            $scope.hoursUpUnavailable = false;
          }

        };


        var update = function(newOrderDate) {
          if (newOrderDate) {
            $scope.orderDate = newOrderDate;
            checkUnavailable(newOrderDate);
            PersistenceService.save('deliveryDate', $scope.orderDate.toString());
          }
        };

        // Add the minimumDuration to the current time and get the next date
        // when the store is delivering
        var serverTime = ServerTime.getServerTime();
        var minutes = DateUtilsService.roundToNext(serverTime.getMinutes() + $scope.deliveryAreaModel.minimumDuration, 5);
        serverTime.setMinutes(minutes);
        $scope.orderDate = new Date(serverTime);
        var now = $scope.openingHours.getNextDate(serverTime, daysInFuture);

        if (now.getDate() === serverTime.getDate()) {
          $scope.deliveresToday = true;
        } else {
          $scope.deliveresToday = false;
        }
        update(now);


        $scope.minimumDurartion = $scope.deliveryAreaModel.minimumDuration;


        $scope.minutesUp = function() {
          update(getNextDate($scope.orderDate, 5));
        };

        $scope.hoursUp = function() {
          update(getNextDate($scope.orderDate, 60));
        };

        $scope.minutesDown = function() {
          update(getPreviousDate($scope.orderDate, -5));
        };

        $scope.hoursDown = function() {
          update(getPreviousDate($scope.orderDate, -60));
        };
      }
    };

  }
];
