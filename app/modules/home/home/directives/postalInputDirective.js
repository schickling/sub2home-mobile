'use strict';

var zipcoder = require('zipcoder');

module.exports = [

  function() {
    return {
      restrict: 'E',
      templateUrl: 'modules/home/home/directives/postalInputDirectiveTemplate.html',
      scope: true,
      link: function($scope, $elem, $attrs) {
        var input = $elem.find('input'),
          compass = $elem.find('i'),
          postal = '';

        $scope.isFocused = false;
        $scope.isLoading = false;

        listenToInput();
        listenToCompass();
        watchParentScope();

        function listenToInput() {
          input.on('focus', function() {
            $scope.$parent[$attrs.appFocused] = true;
            $scope.isFocused = true;
            $scope.$parent.$apply();
          });

          input.on('blur', function() {
            $scope.$parent[$attrs.appFocused] = false;
            $scope.isFocused = false;
            $scope.$parent.$apply();
          });

          input.on('keydown', function(e) {

            if (e.keyCode === 8) {
              return;
            }

            if (input.val().length >= 5) {
              e.preventDefault();
              return;
            }

            if (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) {
              e.preventDefault();
              return;
            }
          });

          input.on('keyup', function() {
            postal = input.val();
            if (postal.length === 5) {
              $scope.$parent[$attrs.appPostal] = postal;
              $scope.$parent.$apply();
              input[0].blur();
            }
          });
        }

        function listenToCompass() {
          compass.on('click', function() {
            determineLocation();
          });
        }

        function watchParentScope() {
          $scope.$parent.$watch($attrs.appDistrict, function() {
            $scope.district = $scope.$parent[$attrs.appDistrict];
          });
        }

        function determineLocation() {
          $scope.isLoading = true;
          $scope.$apply();
          zipcoder.location(function(result) {
            $scope.isLoading = false;
            $scope.$apply();
            input.val(result.zipcode);
            $scope.$parent[$attrs.appPostal] = result.zipcode;
            $scope.$parent.$apply();
          });
        }

      }
    }
  }
];