'use strict';

module.exports = ['$location', '$routeParams',
  function($location, $routeParams) {

    return {

      navigate: function(path) {

        if ($routeParams.hasOwnProperty('storeAlias')) {
          path = path.replace(':storeAlias', $routeParams.storeAlias);
        }

        $location.path(path);

      },

    };

  }
];
