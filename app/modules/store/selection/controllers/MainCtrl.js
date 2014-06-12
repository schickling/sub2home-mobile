'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window', 'OrderedItemModelIteratorService', '$timeout',

  function($scope, orderedItemModel, $window, OrderedItemModelIteratorService, $timeout) {

    OrderedItemModelIteratorService.init(orderedItemModel);

    $scope.back = function() {
      $window.history.back();
    };

    $scope.selectIngredient = function(ingredientModel) {

      var newIsSelected = !ingredientModel.isSelected;

      var numberOfSelectedIngredients = $scope.entity.ingredientsCollection.reduce(function(sum, model) {
        return sum + model.isSelected;
      }, 0);

      if ($scope.entity.isMandatory && numberOfSelectedIngredients <= 1 && !newIsSelected) {
        return;
      }

      if ($scope.entity.isSingle && numberOfSelectedIngredients > 0) {
        $scope.entity.ingredientsCollection.forEach(function(model) {
          model.isSelected = false;
        });
      }

      ingredientModel.isSelected = newIsSelected;

      if ($scope.entity.isSingle) {
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

    $scope.jumpToEntity = function(entity) {
      OrderedItemModelIteratorService.jumpToEntity(entity);
      updateScope();
    };

    function updateScope() {

      $scope.orderedArticlesCollection = orderedItemModel.orderedArticlesCollection;
      $scope.title = 'Sandwich';
      $scope.entity = OrderedItemModelIteratorService.getEntity();
      $scope.type = OrderedItemModelIteratorService.getType();

    }

    updateScope();

  }
];
