'use strict';

module.exports = ['$resource', '_', 'ApiService', 'ServerTime',
  function($resource, _, ApiService, ServerTime) {

    var hook = function(res) {

      var timestampString = new Date(res.headers()['server-time']).getTime();
      ServerTime.setServerTime(new Date(timestampString));

      return res.data;
    };


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
              responseError: this._errorCallback,
              response: hook
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
