'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window',

  function($scope, orderedItemModel, $window) {

    $scope.title = 'Sandwich';
    $scope.ingredientsCollection = orderedItemModel.orderedArticlesCollection[0].articleModel.ingredientCategoriesCollection[0].ingredientsCollection;

    $scope.back = function() {
      $window.history.back();
    };

  }
];
