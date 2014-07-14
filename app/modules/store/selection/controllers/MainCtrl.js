'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window', 'EntityIteratorService', '$timeout',

  function($scope, orderedItemModel, $window, EntityIteratorService, $timeout) {

    EntityIteratorService.init(orderedItemModel);

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
      EntityIteratorService.next();
      updateScope();
    };

    $scope.prev = function() {
      EntityIteratorService.prev();
      updateScope();
    };

    $scope.jumpToEntity = function(entity) {
      EntityIteratorService.jumpToEntity(entity);
      updateScope();
    };

    var updateScope = function() {

      $scope.orderedArticlesCollection = orderedItemModel.orderedArticlesCollection;
      $scope.articleModel = EntityIteratorService.getArticleModel();
      $scope.entity = EntityIteratorService.getEntity();
      $scope.type = EntityIteratorService.getType();
      $scope.menuUpgrade = false;

      if (EntityIteratorService.getNextEntity() === undefined) {
        $scope.toTray = true;
      } else {
        $scope.toTray = false;
        $scope.nextStep = EntityIteratorService.getNextEntity().title;
      }

    };

    updateScope();

  }
];
