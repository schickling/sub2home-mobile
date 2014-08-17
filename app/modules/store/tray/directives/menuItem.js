'use strict';

module.exports = ['ArticleHelper',

  function(ArticleHelper) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/tray/directives/menuItem.html',
      link: function($scope, $elem, $attrs) {

        $scope.edit = false;
        $scope.editBwd = false;

        $scope.remove = false;
        $scope.removeBwd = false;


        $scope.toString = function(item) {
          return ArticleHelper.articleToString(item);
        };
      }
    };

  }
];
