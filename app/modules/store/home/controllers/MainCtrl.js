'use strict';

module.exports = ['$scope', 'store', 'categories', 'selectedDeliveryArea',

  function($scope, store, categories, selectedDeliveryArea) {

    $scope.items = categories.data[1].itemsCollection;

    $scope.getDistrict = function() {
      return selectedDeliveryArea.district || selectedDeliveryArea.city;
    };

  }
];