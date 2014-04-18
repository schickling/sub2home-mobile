'use strict';

module.exports = ['$scope', 'stores', 'PostalFilterService',

  function($scope, stores, PostalFilterService) {

    $scope.inputFocused = false;
    $scope.postal = '';
    $scope.deliveryAreas = [];
    $scope.stores = [];
    $scope.showStores = false;

    PostalFilterService.init(stores.data);

    $scope.$watch('postal', function() {
      var postal = parseInt($scope.postal, 10);
      PostalFilterService.filter(postal);
      $scope.stores = PostalFilterService.getStores();
      $scope.deliveryAreas = PostalFilterService.getDeliveryAreas();
      $scope.showStores = $scope.stores.length === 1 && $scope.deliveryAreas.length === 1;
    });

    $scope.processDeliveryArea = function(deliveryArea) {
      $scope.showStores = true;
    };

    $scope.getDeliveryTimeString = function(store) {
      return "liefert gerade";
    };

    $scope.isDelivering = function(store) {
      return true;
    };

  }
];