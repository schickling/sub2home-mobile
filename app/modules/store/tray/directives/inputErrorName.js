'use strict';

module.exports = ['$timeout',

  function($timeout) {
    var linkFn;
    linkFn = function(scope, el, attrs, formCtrl) {
      var blurred, inputEl, inputName, inputNgEl;
      blurred = false;
      inputEl = el[0].querySelector('[name]');
      inputNgEl = angular.element(inputEl);
      inputName = inputNgEl.attr('name');

      if (!inputName) {
        throw 'inputErrorName element has no child input elements with a \'firstName\' attribute';
      }

      inputNgEl.bind('blur', function() {
        blurred = true;
        if (formCtrl[inputName].$invalid) {
          el.addClass('invalid');
          el.removeClass('valid');
        } else {
          el.addClass('valid');
          el.removeClass('invalid');
        }
      });

      scope.$watch(function() {
        return formCtrl[inputName].$invalid;
      }, function(invalid) {
        if (!blurred && invalid) {
          return;
        }
        return el.toggleClass('invalid', invalid);
      });

      scope.$on('show-errors-check-validity', function() {
        return el.toggleClass('invalid', formCtrl[inputName].$invalid);
      });
      return scope.$on('show-errors-reset', function() {
        return $timeout(function() {
          el.removeClass('invalid');
          blurred = false;
          return blurred;
        }, 0, false);
      });
    };

    return {
      restrict: 'A',
      require: '^form',
      compile: function(elem, attrs) {
        if (!elem.hasClass('inputContainer')) {
          throw 'show-errors element does not have the \'inputContainer\' class';
        }
        return linkFn;
      }
    };
  }
];
