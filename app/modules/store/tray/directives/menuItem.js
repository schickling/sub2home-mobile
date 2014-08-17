'use strict';

module.exports = ['ArticleHelper', 'TrayStorageService', '$route',

  function(ArticleHelper, TrayStorageService, $route) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/tray/directives/menuItem.html',
      link: function($scope, $elem, $attrs) {

        $scope.edit = false;
        $scope.editBwd = false;

        $scope.remove = false;
        $scope.removeBwd = false;

        $scope.removeItem = function() {
          TrayStorageService.removeMenuItem($scope.menuItem);
          $route.reload();
        };

        $scope.toString = function(item) {
          return ArticleHelper.articleToString(item);
        };
      }
    };

  }
];
