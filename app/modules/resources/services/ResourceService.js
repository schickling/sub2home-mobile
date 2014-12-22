'use strict';

module.exports = ['$resource', '_', 'ApiService', 'ServerTime',
  function($resource, _, ApiService, ServerTime) {

    var hook = function(res) {

      var serverTimeString = res.headers()['server-time'];
      var length = serverTimeString.length;
      var serverGMT = serverTimeString.substr(length - 5, length)
        .split(':')[0];

      ServerTime.setServerTime(new Date(serverTimeString), parseInt(serverGMT));

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
