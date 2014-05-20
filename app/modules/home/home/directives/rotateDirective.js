'use strict';

module.exports = [

  function() {
    return {
      link: function($scope, $element, $attrs) {
        $scope.$watch($attrs.appDegrees, function(rotateDegrees) {
          rotateDegrees %= 180;
          $element.css({
            '-moz-transform': 'rotate(' + rotateDegrees + 'deg)',
            '-webkit-transform': 'rotate(' + rotateDegrees + 'deg)',
            '-o-transform': 'rotate(' + rotateDegrees + 'deg)',
            '-ms-transform': 'rotate(' + rotateDegrees + 'deg)'
          });
        });
      }
    };
  }
];