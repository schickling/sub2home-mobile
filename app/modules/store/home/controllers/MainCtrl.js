'use strict';

module.exports = ['$scope', 'store', 'categories', '_',

  function($scope, store, categories, _) {

    $scope.items = categories.data[1].itemsCollection;

  }
];