'use strict';

module.exports = ['$timeout',

  function($timeout) {

    var $html = angular.element(document.getElementsByTagName('html')[0]);
    var timeoutPromise;

    return {

      lock: function() {

        $html.addClass('preloading');

        timeoutPromise = $timeout(function() {
          $html.addClass('loading');
        }, 10);

      },

      unlock: function() {

        $timeout.cancel(timeoutPromise);

        $html.removeClass('preloading');
        $html.removeClass('loading');

      }

    };

  }
];
