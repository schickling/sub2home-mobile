'use strict';

module.exports = ['$scope', 'storeModel', '_', 'selectedDeliveryAreaModel',

  function($scope, storeModel, _, selectedDeliveryAreaModel) {

    $scope.storeModel = storeModel;

    $scope.selectedDeliveryAreaModel = null;
    if (selectedDeliveryAreaModel) {
      $scope.selectedDeliveryAreaModel = _.find(storeModel.deliveryAreasCollection, {
        id: selectedDeliveryAreaModel.id
      });
    }

    $scope.dayOfWeekStrings = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

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

    groupedDeliveryTimes.push(groupedDeliveryTimes.shift());

    $scope.groupedDeliveryTimes = groupedDeliveryTimes;

  }
];
