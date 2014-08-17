'use strict';

module.exports = ['ArticleHelper', 'TrayStorageService', '$route',

  function(ArticleHelper, TrayStorageService, $route) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/tray/directives/subItem.html',
      link: function($scope, $elem, $attrs) {

        $scope.edit = false;
        $scope.editBwd = false;

        $scope.remove = false;
        $scope.removeBwd = false;

        $scope.toString = ArticleHelper.articleToString($scope.subItem);

        $scope.removeItem = function() {
          TrayStorageService.removeSubItem($scope.subItem);
          $route.reload();
        };
      }
    };

  }
];
