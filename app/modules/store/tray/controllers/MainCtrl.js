'use strict';

module.exports = ['$scope', 'TrayStorageService', 'TrayService',

  function($scope, TrayStorageService, TrayService) {
    $scope.allSingleItems = TrayStorageService.getAllSingleItems();

    $scope.allSubItems = TrayStorageService.getAllSubItems();

    $scope.allMenuItems = TrayStorageService.getAllMenuItems();

    $scope.totalAmount = TrayService.getTotalAmount();
  }
];
