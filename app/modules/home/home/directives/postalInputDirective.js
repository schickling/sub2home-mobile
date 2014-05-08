'use strict';

var zipcoder = require('zipcoder');

module.exports = ['$timeout',

  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'modules/home/home/directives/postalInputDirective.html',
      scope: true,
      link: function($scope, $elem, $attrs) {

        var input = $elem.find('input');
        var compass = $elem.find('i');
        var abortLocationDetermination;

        $scope.isFocused = false;
        $scope.isLoading = false;

        $scope.determineLocation = function() {
          $scope.isLoading = true;
          abortLocationDetermination = false;
          zipcoder.location(function(result) {
            if (!abortLocationDetermination) {
              $scope.isLoading = false;
              input.val(result.zipcode);
              checkShrinking();
              $scope.$parent[$attrs.appPostal] = result.zipcode;
              $scope.$parent.$apply();
            }
          });
        };

        $scope.onBlur = function() {
          $scope.$parent[$attrs.appFocused] = false;
          $scope.isFocused = false;
          checkShrinking();
        };

        $scope.onFocus = function() {
          abortLocationDetermination = true;
          $scope.$parent[$attrs.appFocused] = true;
          $scope.isFocused = true;
          $elem.removeClass('postalOnly');
        };

        $scope.onKeydown = function($event) {

          // allow backspace
          if ($event.keyCode === 8) {
            return;
          }

          if (input.val().length >= 5) {
            $event.preventDefault();
            return;
          }

          // prevent everything but numbers
          if ($event.keyCode > 31 && ($event.keyCode < 48 || $event.keyCode > 57)) {
            $event.preventDefault();
            return;
          }

        };

        $scope.onKeyup = function() {

          var postal = input.val();

          if (postal.length === 5) {

            $scope.$parent[$attrs.appPostal] = postal;

            // timeout hack needed for $apply cycle
            $timeout(function() {
              input[0].blur();
            }, 0, false);

          }

          checkShrinking();

        };

        $scope.determineLocation();

        $scope.$parent.$watch($attrs.appDistrict, function() {
          $scope.district = $scope.$parent[$attrs.appDistrict];
        });

        function checkShrinking() {
          var postal = input.val();
          $elem.toggleClass('postalOnly', postal.length === 5);
        }

      }
    }
  }
];