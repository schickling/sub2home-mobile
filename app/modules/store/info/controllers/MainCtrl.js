'use strict';

module.exports = ['$scope', 'storeModel', '_', 'selectedDeliveryAreaModel',
  'PersistenceService',

  function($scope, storeModel, _, selectedDeliveryAreaModel,
    PersistenceService) {

    $scope.storeModel = storeModel;

    $scope.groupedDeliveryAreas = _.groupBy(storeModel.deliveryAreasCollection, 'postal');
    $scope.selectedDeliveryAreaModel = null;
    if (selectedDeliveryAreaModel) {
      $scope.selectedDeliveryAreaModel = _.find(storeModel.deliveryAreasCollection, {
        id: selectedDeliveryAreaModel.id
      });
    }

    /*
     * delivery times
     */
    var getHours = m => parseInt(m / 60, 10);
    var getMinutes = function(minutes) {
      minutes = minutes % 60;
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      return minutes;
    };
    var groupedDeliveryTimes = _(storeModel.deliveryTimesCollection)
      .map(d => _.assign(d, {
        startString: getHours(d.startMinutes) + ':' + getMinutes(d.startMinutes),
        endString: getHours(d.endMinutes) + ':' + getMinutes(d.endMinutes),
      }))
      .groupBy('dayOfWeek')
      .values()
      .value();

    // arrange to start with monday (sunday is default)
    groupedDeliveryTimes.push(groupedDeliveryTimes.shift());

    $scope.groupedDeliveryTimes = groupedDeliveryTimes;
    $scope.dayOfWeekStrings = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    $scope.selectDeliveryArea = function(deliveryAreaModel) {
      PersistenceService.save('selectedDeliveryAreaModel', deliveryAreaModel);
      $scope.selectedDeliveryAreaModel = deliveryAreaModel;
    };

  }
];
