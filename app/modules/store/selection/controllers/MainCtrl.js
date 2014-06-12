'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window', 'OrderedItemModelIteratorService',

  function($scope, orderedItemModel, $window, OrderedItemModelIteratorService) {

    OrderedItemModelIteratorService.init(orderedItemModel);

    $scope.title = 'Sandwich';
    $scope.ingredientCategoryModel = OrderedItemModelIteratorService.getEntity();
    $scope.ingredientsCollection = $scope.ingredientCategoryModel.ingredientsCollection;
    $scope.type = OrderedItemModelIteratorService.getType();

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

      if ($scope.ingredientCategoryModel.isSingle) {
        $scope.next();
      }

    };

    $scope.next = function() {

    };

  }
];
