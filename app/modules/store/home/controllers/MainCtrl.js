'use strict';

module.exports = ['$scope', 'storeModel', 'categoriesCollection', '_',
  'selectedDeliveryAreaModel', 'RoutingService', 'PersistenceService',
  'PostalOracleService',

  function($scope, storeModel, categoriesCollection, _,
    selectedDeliveryAreaModel, RoutingService, PersistenceService,
    PostalOracleService) {

    $scope.categoriesCollection = categoriesCollection;
    $scope.currentCategoryModel = categoriesCollection.current;
    $scope.itemsCollection = categoriesCollection.current.itemsCollection;
    var nextCategoryIndex = (categoriesCollection.indexOf(categoriesCollection.current) + 1) % categoriesCollection.length;
    $scope.nextCategoryModel = categoriesCollection[nextCategoryIndex];
    $scope.navToggled = false;
    $scope.storeModel = storeModel;
    $scope.groupedDeliveryAreasCollection = _.groupBy(storeModel.deliveryAreasCollection, 'postal');
    $scope.suggestedDeliveryAreasCollection = [];
    $scope.checkingPostal = false;
    $scope.selectedDeliveryAreaModel = null;

    if (selectedDeliveryAreaModel) {
      $scope.selectedDeliveryAreaModel = _.find(storeModel.deliveryAreasCollection, {
        id: selectedDeliveryAreaModel.id
      });
    }

    $scope.chooseDeliveryArea = !$scope.selectedDeliveryAreaModel;

    $scope.toggleNav = function(value) {
      $scope.navToggled = value !== undefined ? value : !$scope.navToggled;
    };

    $scope.selectCategory = function(categoryModel) {
      RoutingService.navigate(':storeAlias/' + categoryModel.id);
    };

    $scope.selectDeliveryArea = function(deliveryAreaModel) {
      PersistenceService.save('selectedDeliveryAreaModel', deliveryAreaModel);
      $scope.selectedDeliveryAreaModel = deliveryAreaModel;
      $scope.suggestedDeliveryAreasCollection = $scope.groupedDeliveryAreasCollection[deliveryAreaModel.postal];
      $scope.chooseDeliveryArea = false;
    };

    if ($scope.chooseDeliveryArea) {

      $scope.checkingPostal = true;

      var postalPromise = PostalOracleService.query();

      postalPromise.then(function(postal) {
        $scope.checkingPostal = false;
        $scope.suggestedDeliveryAreasCollection = $scope.groupedDeliveryAreasCollection[postal];
      });

      postalPromise.catch(function() {
        $scope.checkingPostal = false;
      });

    } else {
      var postal = $scope.selectedDeliveryAreaModel.postal;
      $scope.suggestedDeliveryAreasCollection = $scope.groupedDeliveryAreasCollection[postal];
    }

  }
];
