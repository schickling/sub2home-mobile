'use strict';

module.exports = ['TrayStorageService', '$route',

  function(TrayStorageService, $route) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/tray/directives/singleItem.html',
      link: function($scope, $elem, $attrs) {

        $scope.edit = false;
        $scope.editBwd = false;

        $scope.remove = false;
        $scope.removeBwd = false;

        $scope.removeItem = function() {
          TrayStorageService.removeSingleItem($scope.singleItem);
          $route.reload();
        };
      }
    };

  }
];
