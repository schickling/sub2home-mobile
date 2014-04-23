'use strict';

module.exports = ['$scope', 'stores', 'PostalFilterService', 'StoreService',
  'StringUtilService',

  function($scope, stores, PostalFilterService, StoreService,
    StringUtilService) {

    $scope.inputFocused = false;
    $scope.postal = '';
    $scope.deliveryAreas = [];
    $scope.stores = [];
    $scope.showStores = false;
    $scope.selectedDeliveryArea = null;

    PostalFilterService.init(stores.data);

    $scope.$watch('postal', function() {
      var postal = parseInt($scope.postal, 10);
      PostalFilterService.filter(postal);

      var stores = PostalFilterService.getStores(),
        deliveryAreas = PostalFilterService.getDeliveryAreas();
      $scope.stores = stores;
      $scope.deliveryAreas = deliveryAreas;
      $scope.showStores = stores.length === 1 && deliveryAreas.length === 1;

      if (deliveryAreas.length === 1) {
        $scope.selectedDeliveryArea = deliveryAreas[0];
      } else {
        $scope.selectedDeliveryArea = null;
      }
    });

    $scope.processDeliveryArea = function(deliveryArea) {
      $scope.showStores = true;
      $scope.selectedDeliveryArea = deliveryArea;

      $scope.stores = $scope.stores.filter(store => StoreService.deliversTo(store, deliveryArea));
    };

    $scope.resetDeliveryArea = function() {
      $scope.stores = PostalFilterService.getStores();
      $scope.showStores = false;
    };

    $scope.getDeliveryTimeString = function(store) {
      if (!store.isOpen) {
        return 'geschlossen';
      } else if ($scope.isDelivering(store)) {
        return 'liefert gerade';
      } else {
        var nextDeliveryTime = StoreService.nextDeliveryTime(store, new Date()),
          hours = parseInt(nextDeliveryTime.startMinutes / 60, 10),
          minutes = nextDeliveryTime.startMinutes % 60,
          paddedMinutes = StringUtilService.padNumber(minutes, 2);
        return `liefert wieder um ${hours}:${paddedMinutes} Uhr`;
      }
    };

    $scope.isDelivering = function(store) {
      return StoreService.isDelivering(store, new Date());
    };

    $scope.getStepClass = function() {
      if ($scope.inputFocused) {
        return 'step2';
      } else if ($scope.stores.length > 0 || $scope.deliveryAreas.length > 0) {
        return 'step3';
      } else {
        return 'step1';
      }
    };

  }
];