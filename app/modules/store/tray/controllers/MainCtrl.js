'use strict';

module.exports = ['$scope', 'TrayStorageService', 'TrayService', 'PersistenceService', 'storeModel',

  function($scope, TrayStorageService, TrayService, PersistenceService, storeModel) {
    $scope.storeModel = storeModel;

    $scope.allSingleItems = TrayStorageService.getAllSingleItems();

    $scope.allSubItems = TrayStorageService.getAllSubItems();

    $scope.allMenuItems = TrayStorageService.getAllMenuItems();

    $scope.totalAmount = TrayService.getTotalAmount();

    $scope.deliveryAreaModel = PersistenceService.load('selectedDeliveryAreaModel');

    $scope.numberOfItems = TrayStorageService.getAllItems().length;

  }
];
