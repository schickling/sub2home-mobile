'use strict';

module.exports = [ '$scope', 'PersistenceService', '$timeout', 'ServerTime',

  function($scope, PersistenceService, $timeout, ServerTime) {

        var getTimeToDelivery = function(deliveryTime) {
          var tmpTime = ServerTime.getServerTime();
          var restTime = deliveryTime - (tmpTime.getHours() * 60);
          restTime = restTime - (tmpTime.getMinutes());

          return restTime;
        };

        $scope.userInfo = PersistenceService.load('formData');
        $scope.storeModel = PersistenceService.load('storeModel');


        $scope.restTime = getTimeToDelivery(PersistenceService.load('timeToDelivery'));



        var countDown = function () {
          $timeout(function() {
            var restTime = getTimeToDelivery(PersistenceService.load('timeToDelivery'));
            if (restTime > 0) {
                if (restTime % 5 === 0) {
                  $scope.restTime = restTime;
                  $scope.$apply();
                }
                countDown();
            }
          }, 60000);

        };

        countDown();

  }
];
