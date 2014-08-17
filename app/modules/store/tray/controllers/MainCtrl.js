'use strict';

module.exports = ['$scope', 'TrayStorageService',

  function($scope, TrayStorageService) {
    $scope.allSingleArticles = TrayStorageService.getAllSingleItems();

    $scope.allSubItems = TrayStorageService.getAllSubItems();

    $scope.allMenuItems = TrayStorageService.getAllMenuItems();
  }
];
