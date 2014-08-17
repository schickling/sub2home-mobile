'use strict';

module.exports = ['$location', '$routeParams', '$window',
  function($location, $routeParams, $window) {

    return {

      navigate: function(path) {

        if ($routeParams.hasOwnProperty('storeAlias')) {
          path = path.replace(':storeAlias', $routeParams.storeAlias);
        }

        if (path === '@back') {
          $window.history.back();
          return;
        }

        $location.path(path);

      },

    };

  }
];
