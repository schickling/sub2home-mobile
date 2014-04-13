'use strict';

module.exports = [

  function() {
    return {
      restrict: 'E',
      template: '<input type="tel" class="bigInput" name="" value="" placeholder="Postleitzahl">',
      link: function(scope, elem, attrs) {
        var input = elem.find('input'),
          postal = '';

        input.on('focus', function() {
          scope[attrs.appFocused] = true;
          scope.$apply();
        });

        input.on('blur', function() {
          scope[attrs.appFocused] = false;
          scope.$apply();
        });

        input.on('keyup', function() {
          postal = input.val();
          if (postal.length === 5) {
            scope[attrs.appPostal] = postal;
            scope.$apply();
            input[0].blur();
          }
        });
      }
    }
  }
];