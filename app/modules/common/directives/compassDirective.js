'use strict';

module.exports = ['$timeout',

  function($timeout) {
    return {
      restrict: 'E',
      template: '<i class="icn iCompass"></i>',
      link: function($scope, $elem, $attrs) {

        var continueRotating = false;
        var el = $elem.find('i');

        $scope.$watch($attrs.rotate, function(isRotating) {

          continueRotating = isRotating;

          if (isRotating) {
            updateRotationDegrees();
          }

        });

        var rotationDegrees = 0;

        function updateRotationDegrees() {

          $timeout(function() {

            rotationDegrees = rotationDegrees + 4;
            rotationDegrees %= 180;
            rotate();

            if (rotationDegrees % 180 !== 0 || continueRotating) {
              updateRotationDegrees();
            }

          }, 30);

        }

        function rotate() {

          el.css({
            '-moz-transform': 'rotate(' + rotationDegrees + 'deg)',
            '-webkit-transform': 'rotate(' + rotationDegrees + 'deg)',
            '-o-transform': 'rotate(' + rotationDegrees + 'deg)',
            '-ms-transform': 'rotate(' + rotationDegrees + 'deg)'
          });

        }

      }
    };

  }
];
