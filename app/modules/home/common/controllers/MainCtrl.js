'use strict';

module.exports = ['$scope', 'StoreService', 'StringUtilService',
  'RoutingServiceb',

  function($scope, StoreService, StringUtilService, RoutingService) {
    $scope.getDeliveryTimeString = function(store) {
      if (!store.isOpen) {
        return 'geschlossen';
      } else if ($scope.isDelivering(store)) {
        return 'liefert gerade';
      } else {
        var nextDeliveryTime = StoreService.nextDeliveryTime(store,
            new Date()),
          hours = parseInt(nextDeliveryTime.startMinutes / 60, 10),
          minutes = nextDeliveryTime.startMinutes % 60,
          paddedMinutes = StringUtilService.padNumber(minutes, 2);
        return 'liefert wieder um ' + hours + ':' + paddedMinutes + ' Uhr';
      }
    };

    $scope.isDelivering = function(store) {
      return StoreService.isDelivering(store, new Date());
    };

    $scope.selectStore = function(store) {
      RoutingService.navigate(store.alias);
    };

  }
];
