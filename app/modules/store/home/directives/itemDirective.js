'use strict';

module.exports = ['$location', '$route',

  function($location, $route) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/home/directives/itemDirective.html',
      link: function($scope, $elem, $attrs) {

        $scope.getBuyClass = function(icon) {
          return 'buy' + icon.substring(0, 1).toUpperCase() + icon.substring(1);
        };

        $scope.handleBuyClick = function(item) {
          console.log(item);
          if (item.hasOwnProperty('allowsIngredients')) {
            if (item.allowsIngredients) {
              $location.path($route.current.params.storeAlias + '/theke/artikel/' + item.id);
            } else {
              console.log('add to cart');
            }
          } else {
            $location.path($route.current.params.storeAlias + '/theke/menu/' + item.id);
          }
        };

      }
    };

  }
];