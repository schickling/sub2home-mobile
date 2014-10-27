'use strict';

module.exports = ['$window',
  function($window) {

    var isProduction = $window.location.hostname.indexOf('sub2home.com') !== -1;

    return {
      isProduction: isProduction
    };

  }
];
