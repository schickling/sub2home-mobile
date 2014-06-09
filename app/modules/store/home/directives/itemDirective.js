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

        $scope.handleBuyClick = function(item) {

          if (item.hasOwnProperty('allowsIngredients')) {
            if (item.allowsIngredients) {
              RoutingService.navigate(':storeAlias/theke/artikel/' + item.id);
            } else {
              alert('add to cart');
            }
          } else {
            RoutingService.navigate(':storeAlias/theke/menu/' + item.id);
          }

        };

      }
    };

  }
];