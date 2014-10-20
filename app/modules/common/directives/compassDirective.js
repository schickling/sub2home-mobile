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
          el.toggleClass('loading', isRotating);
        });

      }
    };

  }
];
