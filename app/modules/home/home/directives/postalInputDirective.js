'use strict';

var zipcoder = require('zipcoder');

module.exports = ['$timeout',

  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'modules/home/home/directives/postalInputDirective.html',
      scope: true,
      link: function($scope, $elem, $attrs) {

        var input = $elem.find('input'),
          compass = $elem.find('i');

        $scope.isFocused = false;
        $scope.isLoading = false;

        $scope.determineLocation = function() {
          $scope.isLoading = true;
          zipcoder.location(function(result) {
            $scope.isLoading = false;
            input.val(result.zipcode);
            $elem.addClass('postalOnly');
            $scope.$parent[$attrs.appPostal] = result.zipcode;
            $scope.$parent.$apply();
          });
        };

        $scope.blur = function() {
          $scope.$parent[$attrs.appFocused] = false;
          $scope.isFocused = false;
        };

        $scope.focus = function() {
          $scope.$parent[$attrs.appFocused] = true;
          $scope.isFocused = true;
        };

        $scope.keydown = function($event) {

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

        $scope.keyup = function() {

          var postal = input.val();

          if (postal.length === 5) {

            $scope.$parent[$attrs.appPostal] = postal;

            $elem.addClass('postalOnly');

            // timeout hack needed for $apply cycle
            $timeout(function() {
              input[0].blur();
            }, 0, false);

          } else {
            $elem.removeClass('postalOnly');
          }

        };

        $scope.determineLocation();

        $scope.$parent.$watch($attrs.appDistrict, function() {
          $scope.district = $scope.$parent[$attrs.appDistrict];
        });

      }
    }
  }
];