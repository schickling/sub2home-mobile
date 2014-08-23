'use strict';

module.exports = ['$scope', 'TrayStorageService', 'TrayService', 'PersistenceService', 'storeModel', 'OrderService', 'OrderService',

  function($scope, TrayStorageService, TrayService, PersistenceService, storeModel, OrderService) {

    $scope.storeModel = storeModel;

    $scope.allSingleItems = TrayStorageService.getAllSingleItems();

    $scope.allSubItems = TrayStorageService.getAllSubItems();

    $scope.allMenuItems = TrayStorageService.getAllMenuItems();

    console.log($scope.allSubItems);
    console.log($scope.allSingleItems);
    console.log($scope.allMenuItems);
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

    $scope.formData.payment = 'cash';

    $scope.order = function() {
      OrderService.order($scope.totalAmount, $scope.formData, $scope.allSingleItems, $scope.allSubItems, $scope.allMenuItems);
    };


  }
];
