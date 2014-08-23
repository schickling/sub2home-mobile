'use strict';

module.exports = ['ArticleHelper', 'TrayStorageService', '$route', 'RoutingService',

  function(ArticleHelper, TrayStorageService, $route, RoutingService) {
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

        $scope.editItem = function() {
          // TODO menuUpgrade
          RoutingService.navigate(':storeAlias/theke/menu/' + $scope.menuItem.menuBundleModel.id);

        };

        $scope.toString = function(item) {
          return ArticleHelper.articleToString(item);
        };
      }
    };

  }
];
