'use strict';

module.exports = ['$timeout', 'PostalOracleService',

  function($timeout, PostalOracleService) {
    return {
      restrict: 'E',
      templateUrl: 'modules/home/home/directives/postalInputDirective.html',
      scope: {
        postal: '=appPostal',
        isFocused: '=appFocused',
        district: '=appDistrict',
      },
      link: function($scope, $elem, $attrs) {

        var input = $elem.find('input');
        var abortLocationDetermination = false;
        var isDeterminingLocation = false;
        var rotationDegrees = 0;

        $scope.isFocused = false;

        $scope.determineLocation = function(overwritePostal) {
          isDeterminingLocation = true;
          abortLocationDetermination = false;
          updateRotationDegrees();
          PostalOracleService.query(overwritePostal).then(function(postal) {
            isDeterminingLocation = false;
            if (!abortLocationDetermination) {
              input.val(postal);
              checkShrinking();
              $scope.postal = postal;
            }
          });
        };

        $scope.onBlur = function() {
          $scope.isFocused = false;
          checkShrinking();
        };

        $scope.onFocus = function() {
          abortLocationDetermination = true;
          $scope.isFocused = true;
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

            $scope.district = '';
            $scope.postal = postal;

            PostalOracleService.set(postal);

            // timeout hack needed for $apply cycle
            $timeout(function() {
              input[0].blur();
            }, 0, false);

          }

          checkShrinking();

        };

        $scope.determineLocation(false);

        function checkShrinking() {
          var postal = input.val();
          $elem.toggleClass('postalOnly', postal.length > 0);
        }

        function updateRotationDegrees() {
          $timeout(function() {
            rotationDegrees = rotationDegrees + 4;
            $scope.rotationDegrees = rotationDegrees;
            if (isDeterminingLocation) {
              updateRotationDegrees();
            } else {
              $scope.rotationDegrees = 0;
            }
          }, 30);
        }

      }
    };

  }
];
