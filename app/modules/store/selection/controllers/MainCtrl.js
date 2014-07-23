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

    $scope.goToTray = function() {
      console.log("I'm hungry. Hurry up!!");
    };

    $scope.upgrade = function(menu) {
      angular.forEach($scope.articleModel.menuUpgradesCollection, function(upgrade) {
        if (menu === upgrade) {
          upgrade.isSelected = true;
          $scope.menuUpgrade = upgrade.menuComponentBlocksCollection;
        }
      });

      $scope.next();
    };

    var updateScope = function() {

      $scope.orderedArticlesCollection = orderedItemModel.orderedArticlesCollection;

      $scope.articleModel = EntityIteratorService.getArticle();
      $scope.entity = EntityIteratorService.getEntity();
      $scope.type = EntityIteratorService.getType();

      var nextEntity = EntityIteratorService.getNextEntity();

      // checks whether the next step is the tray or not
      if (!nextEntity) {
        $scope.toTray = true;
      } else if (Object.prototype.toString.call(nextEntity) === '[object Array]') {
        $scope.toTray = false;
        $scope.nextStep = nextEntity[0];
      } else {
        $scope.toTray = false;
        $scope.nextStep = nextEntity;
      }

    };

    updateScope();

  }
];
