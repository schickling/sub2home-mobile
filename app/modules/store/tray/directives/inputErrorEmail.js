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
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (formCtrl[inputName].$invalid || !re.test(formCtrl[inputName].$modelValue)) {
          el.addClass('invalid');
          el.removeClass('valid');
        } else {
          el.addClass('valid');
          el.removeClass('invalid');
        }

        if (formCtrl[inputName].$modelValue === '' || formCtrl[inputName].$modelValue === undefined) {
          el.removeClass('valid');
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
