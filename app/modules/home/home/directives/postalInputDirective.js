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
      link: function($scope, $elem) {

        var input = $elem.find('input');
        var abortLocationDetermination = false;

        $scope.isFocused = false;
        $scope.isDeterminingLocation = false;

        $scope.determineLocation = function(overwritePostal) {
          $scope.isDeterminingLocation = true;
          abortLocationDetermination = false;

          var postalPromise = PostalOracleService.query(overwritePostal);

          postalPromise.then(function(postal) {
            $scope.isDeterminingLocation = false;
            if (!abortLocationDetermination) {
              input.val(postal);
              checkShrinking();
              $scope.postal = postal;
            }
          });

          postalPromise.catch(function() {
            $scope.isDeterminingLocation = false;
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

      }
    };

  }
];
