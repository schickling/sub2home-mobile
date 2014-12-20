'use strict';

module.exports = ['$scope', 'storeModel', 'categoriesCollection', '_',
  'selectedDeliveryAreaModel', 'RoutingService', 'PersistenceService',
  'PostalOracleService', 'NotificationService', '$timeout',
  'TrayStorageService', 'LastPageService', '$location', 'TrayService',

  function($scope, storeModel, categoriesCollection, _,
    selectedDeliveryAreaModel, RoutingService, PersistenceService,
    PostalOracleService, NotificationService, $timeout, TrayStorageService,
    LastPageService, $location, TrayService) {

    $scope.categoriesCollection = categoriesCollection;
    $scope.currentCategoryModel = categoriesCollection.current;
    $scope.itemsCollection = categoriesCollection.current.itemsCollection;
    var nextCategoryIndex = (categoriesCollection.indexOf(categoriesCollection.current) + 1) % categoriesCollection.length;
    $scope.nextCategoryModel = categoriesCollection[nextCategoryIndex];
    $scope.navToggled = false;
    $scope.storeModel = storeModel;
    $scope.groupedDeliveryAreasCollection = _.groupBy(storeModel.deliveryAreasCollection, 'postal');
    $scope.suggestedDeliveryAreasCollection = [];
    $scope.checkingPostal = false;
    $scope.selectedDeliveryAreaModel = null;
    $scope.storeClosed = !storeModel.isOpen;
    $scope.messageText = storeModel.messageText;


    $scope.totalAmount = TrayService.getTotalAmount();

    if (!$scope.storeModel.isMessageActive) {
      NotificationService.removeStoreHomeNotification();
    }
    $scope.notification = NotificationService.getStoreHomeNotification();

    LastPageService.set($location.path(), $scope.currentCategoryModel.title);

    $scope.setTrayNotification = function() {
      $scope.trayNotification = NotificationService.getTrayNotification();
      if ($scope.trayNotification) {
        $timeout(function() {
          NotificationService.removeTrayNotification();
          $scope.trayNotification = NotificationService.getTrayNotification();
        }, 3000);
      }
    };

    $scope.setTrayNotification();

    //TODO find better solution
    $scope.$on('trayNotification', function(event, item) {
      $scope.numberOfItemsInTray = TrayStorageService.getAllItems().length;
      $scope.setTrayNotification();
      $scope.totalAmount = TrayService.getTotalAmount();
    });

    $scope.numberOfItemsInTray = TrayStorageService.getAllItems().length;


    if (selectedDeliveryAreaModel) {
      $scope.selectedDeliveryAreaModel = _.find(storeModel.deliveryAreasCollection, {
        id: selectedDeliveryAreaModel.id
      });
    }

    $scope.chooseDeliveryArea = !$scope.selectedDeliveryAreaModel;

    $scope.hideDeliveryArea = function() {
      $scope.chooseDeliveryArea = false;
    };

    $scope.toggleNav = function(value) {
      if (value === undefined) {
        NotificationService.removeTrayNotification();
        $scope.trayNotification = NotificationService.getTrayNotification();
      }
      $scope.navToggled = value !== undefined ? value : !$scope.navToggled;
    };

    $scope.selectCategory = function(categoryModel) {
      RoutingService.navigate(':storeAlias/' + categoryModel.id);
    };

    $scope.selectDeliveryArea = function(deliveryAreaModel) {
      PersistenceService.save('selectedDeliveryAreaModel', deliveryAreaModel);
      $scope.selectedDeliveryAreaModel = deliveryAreaModel;
      $scope.suggestedDeliveryAreasCollection = $scope.groupedDeliveryAreasCollection[deliveryAreaModel.postal];
      $scope.chooseDeliveryArea = false;
    };

    if ($scope.chooseDeliveryArea) {

      $scope.checkingPostal = true;

      var postalPromise = PostalOracleService.query();

      postalPromise.then(function(postal) {
        $scope.checkingPostal = false;
        $scope.suggestedDeliveryAreasCollection = $scope.groupedDeliveryAreasCollection[postal];
      });

      postalPromise.
      catch(function() {
        $scope.checkingPostal = false;
      });

    } else {
      var postal = $scope.selectedDeliveryAreaModel.postal;
      $scope.suggestedDeliveryAreasCollection = $scope.groupedDeliveryAreasCollection[postal];
    }

    $scope.removeNotification = function() {
      NotificationService.removeStoreHomeNotification();
      $scope.notification = NotificationService.getStoreHomeNotification();
    };
  }
];
