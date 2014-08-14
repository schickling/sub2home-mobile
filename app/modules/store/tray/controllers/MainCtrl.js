'use strict';

module.exports = ['$scope', 'TrayService',

  function($scope, TrayService) {
    $scope.allArticles = TrayService.getAllSingeItems();
  }
];
