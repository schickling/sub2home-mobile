'use strict';

module.exports = ['$scope', '$route', 'store', 'categories', '_',
  'selectedDeliveryArea',

  function($scope, $route, store, categories, _, selectedDeliveryArea) {

    $scope.categories = categories;
    $scope.currentCategory = categories.current;
    $scope.items = categories.current.itemsCollection;
    var nextCategoryIndex = (categories.indexOf(categories.current) + 1) % categories.length;
    $scope.nextCategory = categories[nextCategoryIndex];
    $scope.$route = $route;
    $scope.navToggled = false;

    $scope.toggleNav = function(value) {
      $scope.navToggled = value !== undefined ? value : !$scope.navToggled;
    };

    $scope.getDistrict = function() {
      return selectedDeliveryArea.district || selectedDeliveryArea.city;
    };

  }
];