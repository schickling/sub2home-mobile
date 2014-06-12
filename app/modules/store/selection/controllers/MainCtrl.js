'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window', 'OrderedItemModelIteratorService', '$timeout',

  function($scope, orderedItemModel, $window, OrderedItemModelIteratorService, $timeout) {

    OrderedItemModelIteratorService.init(orderedItemModel);

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
        $timeout($scope.next, 600);
      }

    };

    $scope.next = function() {
      OrderedItemModelIteratorService.next();
      updateScope();
    };

    $scope.prev = function() {
      OrderedItemModelIteratorService.prev();
      updateScope();
    };

    function updateScope() {

      $scope.title = 'Sandwich';
      $scope.ingredientCategoryModel = OrderedItemModelIteratorService.getEntity();
      $scope.ingredientsCollection = $scope.ingredientCategoryModel.ingredientsCollection;
      $scope.type = OrderedItemModelIteratorService.getType();

    }

    updateScope();

  }
];
