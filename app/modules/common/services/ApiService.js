'use strict';

module.exports = function() {

  return {

    _storeAlias: '',

    buildUrl: function(fragment) {

      fragment = fragment || '';
      fragment = fragment.replace('storeAlias', this._storeAlias);

      return 'https://' + window.location.hostname + ':1071/' + fragment;
    },

    setStoreAlias: function(storeAlias) {
      this._storeAlias = storeAlias;
    },

  };

};