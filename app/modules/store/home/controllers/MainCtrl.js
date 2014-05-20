'use strict';

module.exports = ['$scope', '$route', 'store', 'categories',
  'selectedDeliveryArea',

  function($scope, $route, store, categories, selectedDeliveryArea) {

    $scope.categories = categories;
    $scope.items = categories.current.itemsCollection;
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