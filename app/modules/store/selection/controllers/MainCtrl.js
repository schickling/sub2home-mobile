'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window', 'EntityIteratorService', '$timeout', 'TrayStorageService', 'RoutingService',

  function($scope, orderedItemModel, $window, EntityIteratorService, $timeout, TrayStorageService, RoutingService) {

    EntityIteratorService.init(orderedItemModel);

    $scope.back = function() {
      $window.history.back();
    };

    $scope.selectIngredient = function(ingredientModel, showNext) {

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

      if (showNext) {
        $scope.next();
      } else if ($scope.entity.isSingle) {
        //$timeout($scope.next, 600);
        $timeout($scope.next, 1);
      }

    };

    $scope.next = function() {
      EntityIteratorService.next().then(function() {
        updateScope();
      });
    };

    $scope.prev = function() {
      EntityIteratorService.prev();
      updateScope();
    };

    $scope.jumpToEntity = function(entity) {
      EntityIteratorService.jumpToEntity(entity).then(function() {
        updateScope();
      });
    };

    $scope.goToTray = function() {
      var orderedItem = EntityIteratorService.getOrderedItemModel();

      if (orderedItem.articlesCollection.length > 1) {
        // menu
        TrayStorageService.saveMenuItem(orderedItem);
      } else {
        orderedItem = orderedItem.articlesCollection[0];

        if (orderedItem.menuUpgradeArticles.length > 0) {
          //menuUpgrade
          var tmp = orderedItem;
          orderedItem = {};
          orderedItem.articlesCollection = [tmp].concat(orderedItem.menuUpgradeArticles);
          TrayStorageService.saveMenuItem(orderedItem);
        } else {
          // sub
          TrayStorageService.saveSubItem(orderedItem);
        }
      }

      RoutingService.navigate(':storeAlias');
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

    $scope.$on('nextEntity', function(event, data) {
      $scope.next();
    });

    var updateTimeline = function() {
      $scope.timelineArticleCollection = EntityIteratorService.getEntityCollection();
    };

    var updateScope = function() {

      $scope.orderedArticlesCollection = orderedItemModel.orderedArticlesCollection;

      $scope.articleModel = EntityIteratorService.getArticle();

      EntityIteratorService.getNextEntity().then(function(nextEntity) {
        // checks whether the next step is the tray or not
        if (!nextEntity) {
          $scope.toTray = true;
        } else if (nextEntity instanceof Array) {
          $scope.toTray = false;
          $scope.nextStep = nextEntity[0];
        } else {
          $scope.toTray = false;
          $scope.nextStep = nextEntity;
        }
      });

      EntityIteratorService.getEntity().then(function(entity) {
        $scope.entity = entity;
      });

      EntityIteratorService.getType().then(function(type) {
        $scope.type = type;
      });

      updateTimeline();

    };

    updateScope();

  }
];
