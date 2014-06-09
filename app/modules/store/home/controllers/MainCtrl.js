'use strict';

module.exports = ['$scope', 'storeModel', 'categoriesCollection', '_',
  'selectedDeliveryAreaModel', 'RoutingService',

  function($scope, storeModel, categoriesCollection, _,
    selectedDeliveryAreaModel, RoutingService) {

    $scope.categoriesCollection = categoriesCollection;
    $scope.currentCategoryModel = categoriesCollection.current;
    $scope.itemsCollection = categoriesCollection.current.itemsCollection;
    var nextCategoryIndex = (categoriesCollection.indexOf(categoriesCollection.current) + 1) % categoriesCollection.length;
    $scope.nextCategoryModel = categoriesCollection[nextCategoryIndex];
    $scope.navToggled = false;

    $scope.toggleNav = function(value) {
      $scope.navToggled = value !== undefined ? value : !$scope.navToggled;
    };

    $scope.getDistrict = function() {
      return selectedDeliveryAreaModel.district || selectedDeliveryAreaModel.city;
    };

    $scope.selectCategory = function(categoryModel) {
      RoutingService.navigate(':storeAlias/' + categoryModel.id);
    };

  }
];