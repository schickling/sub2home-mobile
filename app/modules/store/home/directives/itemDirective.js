'use strict';

module.exports = ['RoutingService',

  function(RoutingService) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/home/directives/itemDirective.html',
      link: function($scope, $elem, $attrs) {

        $scope.getBuyClass = function(icon) {
          return 'buy' + icon.substring(0, 1).toUpperCase() + icon.substring(1);
        };

        $scope.handleBuyClick = function(itemModel) {

          if (itemModel.hasOwnProperty('allowsIngredients')) {
            if (itemModel.allowsIngredients) {
              RoutingService.navigate(':storeAlias/theke/artikel/' + itemModel.id);
            } else {
              alert('add to cart');
            }
          } else {
            RoutingService.navigate(':storeAlias/theke/menu/' + itemModel.id);
          }

        };

      }
    };

  }
];