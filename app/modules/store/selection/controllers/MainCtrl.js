'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window',
  'EntityIteratorService', '$timeout', 'TrayStorageService', 'RoutingService',
  '$document', '_', 'NotificationService',

  function($scope, orderedItemModel, $window, EntityIteratorService, $timeout,
    TrayStorageService, RoutingService, $document, _, NotificationService) {

    var getAllArticles = function(entity) {
      var all = [];
      if (entity.menuComponentOptionsCollection) {
        _.forEach(entity.menuComponentOptionsCollection, function(optionCollection) {
          all = _.union(all, optionCollection.menuComponentOptionArticlesCollection);
        });
      } else {
        if (entity.menuComponentOptionArticlesCollection) {
          all = entity.menuComponentOptionArticlesCollection;
        }
      }

      return all;
    };

    var isOneSelected = function(all) {
      var result = false;
      _.forEach(all, function(item) {
        if (item.isSelected) {
          result = true;
        }
      });

      return result;
    };

    EntityIteratorService.init(orderedItemModel);

    var backInProgress = false;

    $scope.back = function() {

      if (!backInProgress) {

        backInProgress = true;

        var confirmed = $window.confirm('Willst du wirklich zurück?');

        if (confirmed) {
          $scope.navigate('@back');
        }

        backInProgress = false;

      }

    };

    $scope.numberOfItems = TrayStorageService.getAllItems().length;

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

      // Make the next entity clickable in the timeline
      if ($scope.hideNextButton) {
        updateNextEntity(true);
        updateTimeline();
      }
      $scope.hideNextButton = false;
      ingredientModel.isSelected = newIsSelected;

    };


    $scope.next = function() {

      EntityIteratorService.next().then(function(next) {
        if (next) {
          updateScope();
        } else {
          updateNextEntity();
          updateTimeline();
        }
      });
    };

    //$scope.prev = function() {
    //EntityIteratorService.prev();
    //updateScope();
    //};

    $scope.jumpToEntity = function(entity) {
      if (entity.passed) {
        EntityIteratorService.jumpToEntity(entity).then(function() {
          updateScope();
        });
      }
    };

    $scope.goToTray = function() {
      var orderedItem = EntityIteratorService.getOrderedItemModel();

      if (orderedItem.articlesCollection.length > 1) {
        // menu
        TrayStorageService.saveMenuItem(orderedItem);
        NotificationService.setTrayNotification(orderedItem.menuBundleModel.title);
      } else {
        orderedItem = orderedItem.articlesCollection[0];

        if (orderedItem.menuUpgradeArticles.length > 0) {
          //menuUpgrade
          var tmp = {};
          tmp.savedArticle = orderedItem;
          orderedItem = {};

          // TODO just use menuUpgradeModel here (check in tray where the menuBundelModel is mandatory)
          orderedItem.menuBundleModel = {};
          orderedItem.articlesCollection = [tmp].concat(tmp.savedArticle.menuUpgradeArticles);
          orderedItem.menuBundleModel.title = 'Sparmenü';
          NotificationService.setTrayNotification(orderedItem.menuBundleModel.title);
          orderedItem.menuUpgradePrice = true;
          TrayStorageService.saveMenuItem(orderedItem);
        } else {
          // sub
          TrayStorageService.saveSubItem(orderedItem);
          NotificationService.setTrayNotification(orderedItem.title);
        }
      }
      RoutingService.navigate(':storeAlias');
    };


    $scope.upgrade = function(menu) {
      angular.forEach($scope.articleModel.menuUpgradesCollection, function(upgrade) {
        if (menu === upgrade) {
          if (upgrade.isSelected) {
            upgrade.isSelected = false;
          } else {
            upgrade.isSelected = true;
          }
        }
      });

      $scope.next();
    };

    $scope.$on('selectItem', function(event, itemModel) {

      var all = getAllArticles($scope.entity);
      var itemModel = itemModel;

      if (!itemModel.isSelected) {
        _.forEach(all, function(model) {
          model.isSelected = false;
        });

        itemModel.isSelected = !itemModel.isSelected;
      }

      $timeout(function() {
        if ($scope.toTray && !itemModel.allowsIngredients) {
          $scope.hideNextButton = false;
          var scrollHeight = document.getElementById('storeSelection').clientHeight;
          $document.scrollTop(scrollHeight, 500);
        } else {
          $scope.next();
        }
      }, 750);

    });

    var timelineScrollContainer = angular.element(document.getElementById('timeline'));

    var updateTimeline = function() {

      var entityCollection = EntityIteratorService.getEntityCollection();

      $scope.timelineArticleCollection = entityCollection;

      // set timeline position
      var itemWidth = 70;
      var flatEntityCollection = [];

      for (var i = 0; i < entityCollection.length; ++i) {

        var currentEntity = entityCollection[i];

        if (currentEntity.menuComponentOptionsCollection) {

          for (var j = 0; j < currentEntity.menuComponentOptionsCollection.length; ++j) {
            flatEntityCollection = flatEntityCollection.concat(currentEntity.menuComponentOptionsCollection[j]);
          }

        }

        if (currentEntity.ingredientCategoriesCollection) {
          flatEntityCollection = flatEntityCollection.concat(currentEntity.ingredientCategoriesCollection);
        }

        if (currentEntity.menuUpgradesCollection) {
          flatEntityCollection.push(currentEntity.menuUpgradesCollection);
        }

      }

      var selectedItemIndex = flatEntityCollection.indexOf($scope.entity);

      $timeout(function() {
        timelineScrollContainer.scrollLeft((selectedItemIndex - 2) * itemWidth, 300);
      }, 100);

    };

    var updateNextEntity = function(lastStepIsValid) {
      EntityIteratorService.getNextEntity().then(function(nextEntity) {

        // checks whether the next step is the tray or not
        if (!nextEntity) {
          $scope.toTray = true;
        } else {
          $scope.toTray = false;
          $scope.nextStep = nextEntity;
          $scope.nextStep.passed = lastStepIsValid;
        }
      });
    };

    var updateScope = function() {

      $scope.orderedArticlesCollection = orderedItemModel.orderedArticlesCollection;
      $scope.menuModel = EntityIteratorService.getMenu();

      EntityIteratorService.getArticle().then(function(article) {
        $scope.articleModel = article;
        if ($scope.menuModel === $scope.articleModel.title || $scope.menuModel === '') {
          $scope.setTwoLineHeader = false;
        } else {
          $scope.setTwoLineHeader = true;
        }
      });

      EntityIteratorService.getEntity().then(function(entity) {
        $scope.entity = entity;

        $scope.entity.passed = true;

        // shows or hides the next button
        $scope.hideNextButton = false;

        if (entity.ingredientsCollection) {
          if (entity.isMandatory) {
            $scope.hideNextButton = true;
            _.forEach(entity.ingredientsCollection, function(ingredient) {
              if (ingredient.isSelected) {
                $scope.hideNextButton = false;
              }
            });
          }
        } else {
          var all = getAllArticles($scope.entity);
          if (all.length > 0) {
            if (!isOneSelected(all)) {
              $scope.hideNextButton = true;
            }
          }

        }

        updateNextEntity(!$scope.hideNextButton);

        // if the entity is the menu
        if (entity instanceof Array) {
          $scope.noUpgrade = true;
        } else {
          $scope.noUpgrade = false;
        }

        $timeout(function() {
          $document.scrollTop(0, 300);
        }, 100);

        updateTimeline();

      });

      EntityIteratorService.getType().then(function(type) {
        $scope.type = type;
      });

    };

    updateScope();

  }
];
