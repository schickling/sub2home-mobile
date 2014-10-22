'use strict';

module.exports = ['$scope', 'PersistenceService', '$timeout', 'ParseService',

  function($scope, PersistenceService, $timeout, ParseService) {

    var getTimeToDelivery = function(deliveryTime) {
      var tmpTime = new Date();
      var restTime = deliveryTime - (tmpTime.getHours() * 60);
      restTime = restTime - (tmpTime.getMinutes());

      return restTime;
    };

    $scope.userInfo = PersistenceService.load('formData');
    $scope.storeModel = PersistenceService.load('storeModel');

    $scope.showRatingMessageInput = false;
    $scope.rating = null;
    $scope.ratingSent = false;
    $scope.ratingMessage = '';

    $scope.sendRating = function(rating) {
      $scope.rating = rating;
      if (!$scope.ratingSent) {
        ParseService.sendRating(rating).then(function() {
          $scope.showRatingMessageInput = true;
          $scope.ratingSent = true;
        });
      }
    };

    $scope.sendMessage = function() {
      ParseService.sendMessage($scope.ratingMessage).then(function() {
        $scope.showRatingMessageInput = false;
      });
    };

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
