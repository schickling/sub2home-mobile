'use strict';

module.exports = ['$timeout', '$rootScope',

  function($timeout, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/selection/directives/articleDirective.html',
      link: function($scope, $elem, $attrs) {
        $scope.hidden = true;

        $scope.handleClick = function(itemModel) {
          //itemModel.isSelected = !itemModel.isSelected;

          $scope.$emit('selectItem', itemModel);

        };

      }
    };

  }
];
