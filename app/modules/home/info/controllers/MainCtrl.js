'use strict';

module.exports = ['$scope', 'storesCollection',

  function($scope, storesCollection) {

    $scope.storesCollection = storesCollection.filter(s => s.title !== 'Test');

  }
];
