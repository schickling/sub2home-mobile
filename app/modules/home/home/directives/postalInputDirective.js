'use strict';

module.exports = [

  function() {
    return {
      restrict: 'E',
      template: '<i class="icn iCompass"></i><input id="postalInput" type="tel" name="" value="" placeholder="Postleitzahl"><span ng-show="selectedDeliveryArea">{{ selectedDeliveryArea.district || selectedDeliveryArea.city }}</span>',
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
            scope[attrs.appPostal] = postal;
            scope.$apply();
            input[0].blur();
          }
        });

      }
    }
  }
];
