'use strict';

module.exports = ['$scope', 'TrayStorageService',

  function($scope, TrayStorageService) {
    $scope.allSingleItems = TrayStorageService.getAllSingleItems();

    $scope.allSubItems = TrayStorageService.getAllSubItems();

    $scope.allMenuItems = TrayStorageService.getAllMenuItems();
  }
];
