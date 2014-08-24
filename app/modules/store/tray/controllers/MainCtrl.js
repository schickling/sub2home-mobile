'use strict';

module.exports = ['$scope', 'TrayStorageService', 'TrayService', 'PersistenceService', 'storeModel', 'OrderService', 'OrderService',

  function($scope, TrayStorageService, TrayService, PersistenceService, storeModel, OrderService) {

    $scope.storeModel = storeModel;

    $scope.allSingleItems = TrayStorageService.getAllSingleItems();

    $scope.allSubItems = TrayStorageService.getAllSubItems();

    $scope.allMenuItems = TrayStorageService.getAllMenuItems();

    $scope.totalAmount = TrayService.getTotalAmount();

    $scope.deliveryAreaModel = PersistenceService.load('selectedDeliveryAreaModel');

    $scope.numberOfItems = TrayStorageService.getAllItems().length;

    $scope.infoDeliveryArea = true;
    $scope.toggleInfoDeliveryArea = function() {
      $scope.infoDeliveryArea = !$scope.infoDeliveryArea;
    };
    $scope.trayQuestion = true;
    $scope.toggleTrayQuestion = function() {
      $scope.trayQuestion = !$scope.trayQuestion;
    };

    $scope.formData = {};
// add city
    $scope.formData.payment = 'cash';

    $scope.order = function() {
      OrderService.order($scope.deliveryAreaModel, $scope.totalAmount, $scope.formData, $scope.allSingleItems, $scope.allSubItems, $scope.allMenuItems);
    };


  }
];
