'use strict';

module.exports = ['$window', 'EnvironmentService',
  function($window, EnvironmentService) {

    return {

      buildUrl: function(fragment) {

        fragment = fragment || '';

        if (EnvironmentService.isProduction) {
          return 'https://api.sub2home.com/' + fragment;
        } else {
          return 'https://' + $window.location.hostname + ':1070/' + fragment;
        }

      },

    };

  }
];
