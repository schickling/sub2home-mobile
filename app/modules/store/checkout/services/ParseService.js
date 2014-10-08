'use strict';

module.exports = ['$http',

  function($http) {

    var objectId;
    var api = 'https://api.parse.com/1/classes/Rating/';
    var headers = {
      'X-Parse-Application-Id': '5HfeOI5rACWm6nO4DLKu2hbq1cpCrEMkna88cUha',
      'X-Parse-REST-API-Key': 'LvNYG3RXQKCJqVX9YDIlfRUGlWy3J2WuObdAt6aH'
    };


    return {

      sendRating: function(val) {

        var promise = $http.post(api, {
          rating: val
        }, {
          headers: headers
        });

        promise.then(function(response) {
          objectId = response.data.objectId;
        });

        return promise;

      },

      sendMessage: function(val) {
        return $http.put(api + objectId, {
          message: val
        }, {
          headers: headers
        });
      },

    };

  }
];
