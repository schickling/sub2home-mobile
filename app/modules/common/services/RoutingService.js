'use strict';

module.exports = ['$location', '$routeParams', '$window',
  function($location, $routeParams, $window) {

    return {

      navigate: function(path) {

        if ($routeParams.hasOwnProperty('storeAlias')) {
          path = path.replace(':storeAlias', $routeParams.storeAlias);
        }

        $location.path(path);

        $window.scrollTo(0,0);

      },

    };

  }
];