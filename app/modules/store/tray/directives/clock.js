'use strict';

module.exports = ['_',

  function(_) {
    return {
      restrict: 'E',
      scope: {
        deliveryAreaModel: '=deliveryAreaModel',
        storeModel: '=storeModel',
      },

      templateUrl: 'modules/store/tray/directives/clock.html',
      link: function($scope, $elem, $attrs) {

        /*
         * returns the current time in minuts and rounded up to the next number dividable by 5
         */
        var getCurrentTime = function() {
          var date = new Date();
          var minutes = date.getMinutes();
          var hours = date.getHours();

          var result = minutes + hours * 60;

          while (result % 5 != 0) {
            result++;
          }

          return result;
        };

        var isDelivering = function(deliveryTimesCollection) {
          return getDeliveryTime(deliveryTimesCollection) ? true : false;
        };

        var getDeliveryTime = function(deliveryTimesCollection) {
          var result = null;
          var dayOfWeek = new Date().getDay();
          var currentTime = getCurrentTime();

          _.forEach(deliveryTimesCollection, function(deliveryTime) {
            if (deliveryTime.dayOfWeek === dayOfWeek && deliveryTime.startMinutes <= currentTime && deliveryTime.endMinutes >= currentTime) {
              result = deliveryTime;
            }
          });

          return result;
        };

        $scope.storeIsDelivering = isDelivering($scope.storeModel.deliveryTimesCollection);

        var minimumDeliveryTime = null;

        if ($scope.storeIsDelivering) {
          minimumDeliveryTime = getCurrentTime() + $scope.deliveryAreaModel.minimumDuration;
          $scope.orderMinutes = minimumDeliveryTime;
          $scope.currentDeliveryTime = getDeliveryTime($scope.storeModel.deliveryTimesCollection);
        } else {
          // TODO find out what todo when the store is closed
        }

        $scope.minutesUp = function() {
          if ($scope.orderMinutes + 5 <= $scope.currentDeliveryTime.endMinutes) {
            $scope.orderMinutes += 5;
          }
        };

        $scope.minutesDown = function() {
          if ($scope.currentDeliveryTime.startMinutes <= $scope.orderMinutes - 5 && minimumDeliveryTime <= $scope.orderMinutes - 5) {
            $scope.orderMinutes -= 5;
          }
        };

        $scope.hoursUp = function() {
          if ($scope.orderMinutes + 60 <= $scope.currentDeliveryTime.endMinutes) {
            $scope.orderMinutes += 60;
          }
        };

        $scope.hoursDown = function() {
          if ($scope.currentDeliveryTime.startMinutes <= $scope.orderMinutes - 60 && minimumDeliveryTime <= $scope.orderMinutes - 60) {
            $scope.orderMinutes -= 60;
          }
        };

      }
    };

  }
];
