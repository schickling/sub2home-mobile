'use strict';

module.exports = ['$scope', 'TrayStorageService', 'TrayService', 'PersistenceService',

  function($scope, TrayStorageService, TrayService, PersistenceService) {
    $scope.allSingleItems = TrayStorageService.getAllSingleItems();

    $scope.allSubItems = TrayStorageService.getAllSubItems();

    $scope.allMenuItems = TrayStorageService.getAllMenuItems();

    $scope.totalAmount = TrayService.getTotalAmount();

    $scope.deliveryAreaModel = PersistenceService.load('selectedDeliveryAreaModel');

  }
];
