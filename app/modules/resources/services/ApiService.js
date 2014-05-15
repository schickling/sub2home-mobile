'use strict';

module.exports = function() {

  return {

    buildUrl: function(fragment) {
      fragment = fragment || '';
      return 'http://' + window.location.hostname + ':1071/' + fragment;
    },

  };

};