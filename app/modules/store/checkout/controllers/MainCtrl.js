'use strict';

module.exports = ['$scope', 'PersistenceService', '$timeout', 'ParseService',
  'ServerTime', 'DateUtilsService',

  function($scope, PersistenceService, $timeout, ParseService, ServerTime,
    DateUtilsService) {
    var getTimeToDelivery = function() {
      var serverTime = ServerTime.getServerTime();
      var deliveryTime = new Date(PersistenceService.load('deliveryDate'));
      var diff = deliveryTime.getTime() - serverTime.getTime();
      if (diff > 0) {
        //var minutes = Math.round(((diff % 86400000) % 3600000) / 60000);
        var minutes = Math.floor(diff / 60000);
        return DateUtilsService.roundToNext(minutes, 5);
      } else {
        return 0;
      }
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

    $scope.restMinutes = getTimeToDelivery();

    var countDown = function() {
      var restMinutes = getTimeToDelivery();

      if (restMinutes > 0) {
        if (restMinutes % 5 === 0) {
          $scope.restMinutes = restMinutes;
          //$scope.$apply();
        }

        $timeout(function() {
          countDown();
        }, 60000);
      } else {
        $scope.restMinutes = 0;
      }
    };

    countDown();

  }
];
