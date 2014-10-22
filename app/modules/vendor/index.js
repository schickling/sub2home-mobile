'use strict';

module.exports = angular.module('vendor', []);

angular.module('vendor').run(['EnvironmentService', '$window', '$rootScope',
  function(EnvironmentService, $window, $rootScope) {

    if (EnvironmentService.isProduction) {

      require('./segment');

      $rootScope.$on('$routeChangeSuccess', function() {
        $window.analytics.page();
      });

    }

  }
]);
