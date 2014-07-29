'use strict';

module.exports = [

  function() {
    return {
      transclude: true,
      restrict: 'E',
      templateUrl: 'modules/store/selection/directives/articleDirective.html',
      scope: {
        itemModel: '=itemModel',
      },
      link: function($scope, $elem, $attrs) {

        $scope.hidden = true;

        $scope.handleClick = function(itemModel) {
          itemModel.isSelected = !itemModel.isSelected;

          $scope.$emit('nextEntity', true);
        };

      }
    };

  }
];
