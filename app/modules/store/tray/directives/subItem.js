'use strict';

module.exports = ['ArticleHelper',

  function(ArticleHelper) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/tray/directives/subItem.html',
      link: function($scope, $elem, $attrs) {

        $scope.edit = false;
        $scope.editBwd = false;

        $scope.remove = false;
        $scope.removeBwd = false;

        $scope.toString = ArticleHelper.articleToString($scope.subItem);
      }
    };

  }
];
