'use strict';

module.exports = ['$scope', 'store', 'categories',

  function($scope, store, categories) {
    console.log(store.data);
    console.log(categories.data);

    $scope.items = categories.data[1].itemsCollection;

  }
];