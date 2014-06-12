'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window',

  function($scope, orderedItemModel, $window) {

    $scope.title = 'Sandwich';
    $scope.ingredientCategoryModel = orderedItemModel.orderedArticlesCollection[0].articleModel.ingredientCategoriesCollection[0];
    $scope.ingredientsCollection = $scope.ingredientCategoryModel.ingredientsCollection;
    $scope.type = 'ingredient';

    $scope.back = function() {
      $window.history.back();
    };

    $scope.selectIngredient = function(ingredientModel) {

      var newIsSelected = !ingredientModel.isSelected;

      var numberOfSelectedIngredients = $scope.ingredientsCollection.reduce(function(sum, model) {
        return sum + model.isSelected;
      }, 0);

      if ($scope.ingredientCategoryModel.isMandatory && numberOfSelectedIngredients <= 1 && !newIsSelected) {
        return;
      }

      if ($scope.ingredientCategoryModel.isSingle && numberOfSelectedIngredients > 0) {
        $scope.ingredientsCollection.forEach(function(model) {
          model.isSelected = false;
        });
      }

      ingredientModel.isSelected = newIsSelected;

    };

    $scope.next = function() {

    };

  }
];
