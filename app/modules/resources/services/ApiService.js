'use strict';

module.exports = ['$window',
  function($window) {

    return {

      buildUrl: function(fragment) {

        fragment = fragment || '';

        var hostname = $window.location.hostname;

        if (hostname.indexOf('sub2home.com') !== -1) {
          return 'https://api.sub2home.com/' + fragment;
        } else {
          return 'https://' + hostname + ':1070/' + fragment;
        }

      },

    };

  }
];
