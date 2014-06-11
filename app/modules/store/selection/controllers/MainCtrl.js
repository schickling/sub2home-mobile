'use strict';

module.exports = ['$scope', 'orderedItemModel',

  function($scope, orderedItemModel) {

    $scope.title = 'Sandwich';
    $scope.ingredientsCollection = orderedItemModel.orderedArticlesCollection[0].articleModel.ingredientCategoriesCollection[0].ingredientsCollection;

  }
];
