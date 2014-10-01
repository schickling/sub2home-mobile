'use strict';

module.exports = ['$scope', 'PersistenceService', '$timeout',

  function($scope, PersistenceService, $timeout) {

    var getTimeToDelivery = function(deliveryTime) {
      var tmpTime = new Date();
      var restTime = deliveryTime - (tmpTime.getHours() * 60);
      restTime = restTime - (tmpTime.getMinutes());

      return restTime;
    };

    $scope.userInfo = PersistenceService.load('formData');
    $scope.storeModel = PersistenceService.load('storeModel');


    $scope.restTime = getTimeToDelivery(PersistenceService.load('timeToDelivery'));



    var countDown = function() {
      var restTime = getTimeToDelivery(PersistenceService.load('timeToDelivery'));
      if (restTime > 0) {
        if (restTime % 5 === 0) {
          $scope.restTime = restTime;
          $scope.$apply();
        }

        $timeout(function() {
          countDown();
        }, 60000);
      } else {
          $scope.restTime = 0;
      }

    };

    countDown();

  }
];
