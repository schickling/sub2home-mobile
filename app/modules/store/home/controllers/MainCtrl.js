'use strict';

module.exports = ['$scope', 'store', 'categories', '_', 'selectedDeliveryArea',
  'RoutingService',

  function($scope, store, categories, _, selectedDeliveryArea, RoutingService) {

    $scope.categories = categories;
    $scope.currentCategory = categories.current;
    $scope.items = categories.current.itemsCollection;
    var nextCategoryIndex = (categories.indexOf(categories.current) + 1) % categories.length;
    $scope.nextCategory = categories[nextCategoryIndex];
    $scope.navToggled = false;

    $scope.toggleNav = function(value) {
      $scope.navToggled = value !== undefined ? value : !$scope.navToggled;
    };

    $scope.getDistrict = function() {
      return selectedDeliveryArea.district || selectedDeliveryArea.city;
    };

    $scope.selectCategory = function(category) {
      RoutingService.navigate(':storeAlias/' + category.id);
    };

  }
];