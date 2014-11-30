'use strict';

module.exports = ['$scope', 'PersistenceService', '$timeout', 'ParseService', 'ServerTime',

  function($scope, PersistenceService, $timeout, ParseService, ServerTime) {
    var getTimeToDelivery = function(deliveryTime) {
      var tmpTime = ServerTime.getServerTime();
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
    $scope.feedbackClass = null;

    $scope.sendRating = function(rating) {
      if (!$scope.ratingSent) {
        $scope.rating = rating;
        ParseService.sendRating(rating).then(function() {
          $scope.showRatingMessageInput = true;
          $scope.ratingSent = true;
        });
      }
    };

    $scope.sendMessage = function() {
      ParseService.sendMessage($scope.ratingMessage).then(function() {
        $scope.showRatingMessageInput = false;
        displayRating();
      });
    };

    $scope.close = function() {
      displayRating();
      $scope.showRatingMessageInput = false;
    };

    var displayRating = function() {
      if ($scope.rating) {
        $scope.feedbackClass = 'positiveFeedback';
      } else {
        $scope.feedbackClass = 'negativeFeedback';
      }
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
