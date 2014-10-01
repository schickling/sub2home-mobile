'use strict';

module.exports = ['$location', '$routeParams', '$window', 'PageLockService',
  function($location, $routeParams, $window, PageLockService) {

    return {

      navigate: function(path) {

        PageLockService.lock();

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
