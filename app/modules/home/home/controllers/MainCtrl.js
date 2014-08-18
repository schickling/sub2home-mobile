'use strict';

module.exports = ['$scope', 'storesCollection', 'selectedDeliveryAreaModel',
  'PostalFilterService', 'StoreService', 'StringUtilService',
  'PersistenceService', 'RoutingService',

  function($scope, storesCollection, selectedDeliveryAreaModel, PostalFilterService,
    StoreService, StringUtilService, PersistenceService, RoutingService) {

    $scope.inputFocused = false;
    $scope.postal = '';
    $scope.district = '';
    $scope.deliveryAreasCollection = [];
    $scope.storesCollection = [];
    $scope.showStores = false;
    $scope.noStoresFound = false;
    $scope.selectedDeliveryAreaModel = selectedDeliveryAreaModel;

    PostalFilterService.init(storesCollection);

    $scope.$watch('postal', function(newValue, oldValue) {

      if (newValue === oldValue) {
        return;
      }

      var postal = parseInt(newValue, 10);
      PostalFilterService.filter(postal);

      var storesCollection = PostalFilterService.getStores(),
        deliveryAreasCollection = PostalFilterService.getDeliveryAreas();

      $scope.storesCollection = storesCollection;
      $scope.deliveryAreasCollection = deliveryAreasCollection;
      $scope.showStores = storesCollection.length === 1 && deliveryAreasCollection.length === 1;
      $scope.noStoresFound = storesCollection.length === 0;

      if (deliveryAreasCollection.length === 1) {
        $scope.selectedDeliveryAreaModel = deliveryAreasCollection[0];
      } else {
        $scope.selectedDeliveryAreaModel = null;
      }

    });

    $scope.$watch('selectedDeliveryAreaModel', function() {
      if ($scope.selectedDeliveryAreaModel) {
        $scope.district = $scope.selectedDeliveryAreaModel.district || $scope.selectedDeliveryAreaModel.city;
        PersistenceService.save('selectedDeliveryAreaModel', $scope.selectedDeliveryAreaModel);
      } else {
        $scope.district = '';
      }
    });

    $scope.processDeliveryArea = function(deliveryArea) {
      $scope.showStores = true;
      $scope.selectedDeliveryAreaModel = deliveryArea;

      var filteredStoresCollection = $scope.storesCollection.filter(store => StoreService.deliversTo(store, deliveryArea));

      if (filteredStoresCollection.length === 1) {
        $scope.selectStore(filteredStoresCollection[0]);
        return;
      }

      $scope.storesCollection = filteredStoresCollection;
    };

    $scope.resetDeliveryArea = function() {
      $scope.storesCollection = PostalFilterService.getStores();
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
        return ` liefert wieder um $ {
          hours
        }: $ {
          paddedMinutes
        }
        Uhr`;
      }
    };

    $scope.isDelivering = function(store) {
      return StoreService.isDelivering(store, new Date());
    };

    $scope.getStepClass = function() {
      if ($scope.inputFocused) {
        return 'step1';
      } else if ($scope.storesCollection.length > 0 || $scope.deliveryAreasCollection.length > 0) {
        return 'step2';
        return 'step2';
      }
    };

    $scope.selectStore = function(store) {
      RoutingService.navigate(store.alias);
    };

  }
];
