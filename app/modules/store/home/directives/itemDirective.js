'use strict';

module.exports = ['RoutingService', 'TrayStorageService', 'NotificationService',

  function(RoutingService, TrayStorageService, NotificationService) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/home/directives/itemDirective.html',
      link: function($scope) {

        $scope.hidden = true;

        $scope.getBuyClass = function(icon) {
          return 'buy' + icon.substring(0, 1).toUpperCase() + icon.substring(1);
        };

        $scope.handleImageBuyClick = function(itemModel) {
          if (itemModel.chainedArticlesCollection &&
            itemModel.chainedArticlesCollection.length > 0) {
            return;
          } else {
            $scope.handleBuyClick(itemModel);
          }

        };

        $scope.handleBuyClick = function(itemModel) {

          if (itemModel.hasOwnProperty('allowsIngredients')) {
            if (itemModel.allowsIngredients) {
              RoutingService.navigate(':storeAlias/theke/artikel/' +
                itemModel.id);
            } else {
              TrayStorageService.saveSingleItem(itemModel);
              NotificationService.setTrayNotification(itemModel.title);
              $scope.$emit('trayNotification', true);
            }
          } else {
            RoutingService.navigate(':storeAlias/theke/menu/' + itemModel.id);
          }

        };

      }
    };

  }
];
