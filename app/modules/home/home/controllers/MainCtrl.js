'use strict';

module.exports = ['$scope', 'stores', 'PostalFilterService', 'StoreService', 'StringUtilService',

  function($scope, stores, PostalFilterService, StoreService, StringUtilService) {

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

      // TODO: filter stores
    };

    $scope.getDeliveryTimeString = function(store) {
      if (!store.isOpen) {
        return "geschlossen";
      } else if ($scope.isDelivering(store)) {
        return "liefert gerade";
      } else {
        var nextDeliveryTime = StoreService.nextDeliveryTime(store, new Date()),
          time = '' + parseInt(nextDeliveryTime.startMinutes / 60) + ':' + StringUtilService.padNumber(parseInt(nextDeliveryTime.startMinutes % 60), 2);
        return `liefert wieder um ${time} Uhr`;
      }
    };

    $scope.isDelivering = function(store) {
      return StoreService.isDelivering(store, new Date());
    };

  }
];