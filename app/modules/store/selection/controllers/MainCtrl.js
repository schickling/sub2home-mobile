'use strict';

module.exports = ['$scope', 'orderedItemModel', '$window',
  'EntityIteratorService', '$timeout', 'TrayStorageService', 'RoutingService',
  '$document', '_', 'NotificationService', 'LastPageService',

  function($scope, orderedItemModel, $window, EntityIteratorService, $timeout,
    TrayStorageService, RoutingService, $document, _, NotificationService,
    LastPageService) {

    $scope.lastPage = LastPageService.get();

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
          $scope.navigate($scope.lastPage.path);
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

      if ($scope.entity.isSingle && newIsSelected) {
        $scope.showBigNext = true;
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

    $scope.showBigNext = false;

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
      var isMenuBundle = !!EntityIteratorService.getOrderedItemModel().menuBundleModel;
      var flatEntityCollection = _(entityCollection)
        .map(e => [e.menuComponentOptionsCollection, e.ingredientCategoriesCollection, [e.menuUpgradesCollection]])
        .flatten(true)
        .flatten(true)
        .compact()
        .filter(e => !(isMenuBundle && e.menuComponentBlocksCollection))
        .value();

      var selectedItemIndex = flatEntityCollection.indexOf($scope.entity);
      var itemWidth = 70;
      var scrollLeft = (selectedItemIndex - 1) * itemWidth + 8;

      timelineScrollContainer.scrollLeft(scrollLeft, 300);

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

    $scope.bigNextScrollable = false;
    $scope.extendBottom = false;

    var body = document.body;
    var scrollListener = function() {
      if (body.scrollTop === body.scrollHeight - window.innerHeight) {
        window.removeEventListener('scroll', scrollListener);
        $scope.bigNextScrollable = true;
        $scope.showBigNext = true;
        $scope.$apply();
      }
    };

    var updateScope = function() {

      $scope.bigNextScrollable = false;
      $scope.extendBottom = false;

      // remove previous scrollListener
      window.removeEventListener('scroll', scrollListener);

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
          $document.scrollTop(0, 300).then(function() {
            if ($scope.type === 'ingredient') {
              var ingredientsElement = document.getElementById('ingredients');
              var ingredientsHeight = ingredientsElement.clientHeight;
              var headerHeight = 75;
              var timelineHeight = 66;

              if (ingredientsHeight + headerHeight + timelineHeight < window.innerHeight) {
                $scope.showBigNext = true;
              } else {
                // reset scroll listener
                $scope.extendBottom = true;
                window.addEventListener('scroll', scrollListener);
              }
            }
          });
        }, 200);

        updateTimeline();

        $scope.showBigNext = false;

      });

      EntityIteratorService.getType().then(function(type) {
        $scope.type = type;
      });

    };

    updateScope();

  }
];
