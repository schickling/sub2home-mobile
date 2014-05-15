'use strict';

module.exports = ['$resource', '_', 'ApiService',
  function($resource, _, ApiService) {

    return {

      _errorCallback: null,

      create: function(fragment, paramDefaults, actions) {

        fragment = fragment || '';
        paramDefaults = paramDefaults || {};
        actions = actions || {};

        actions = _.defaults(actions, {
          query: {
            method: 'GET',
            isArray: true,
            interceptor: {
              responseError: this._errorCallback
            },
          },
          get: {
            method: 'GET',
            interceptor: {
              responseError: this._errorCallback
            },
          },
          save: {
            method: 'PUT',
          },
          create: {
            method: 'POST',
          },
          remove: {
            method: 'DELETE',
          },
        });

        var url = ApiService.buildUrl(fragment);

        return $resource(url, paramDefaults, actions);

      },

      setErrorCallback: function(errorCallback) {
        this._errorCallback = errorCallback;
      },

    };

  }
];