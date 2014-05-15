'use strict';

module.exports = ['$scope', '$route', 'store', 'categories',
  'selectedDeliveryArea',

  function($scope, $route, store, categories, selectedDeliveryArea) {

    $scope.categories = categories;
    $scope.items = categories.current.itemsCollection;
    $scope.$route = $route;

    $scope.getDistrict = function() {
      return selectedDeliveryArea.district || selectedDeliveryArea.city;
    };

  }
];