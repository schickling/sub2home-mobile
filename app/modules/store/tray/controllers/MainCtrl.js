'use strict';

module.exports = ['$scope', 'TrayStorageService', 'TrayService',
  'PersistenceService', 'storeModel', 'OrderService', 'RoutingService',
  '$timeout', 'LastPageService', 'ServerTime', 'DateUtilsService',
  'OpeningHoursFactory',

  function($scope, TrayStorageService, TrayService, PersistenceService,
    storeModel, OrderService, RoutingService, $timeout, LastPageService,
    ServerTime, DateUtilsService, OpeningHoursFactory) {

    $scope.storeModel = storeModel;
    $scope.lastPage = LastPageService.get();

    $scope.allSingleItems = TrayStorageService.getAllSingleItems();

    $scope.allSubItems = TrayStorageService.getAllSubItems();

    $scope.allMenuItems = TrayStorageService.getAllMenuItems();

    $scope.totalAmount = TrayService.getTotalAmount();

    $scope.deliveryAreaModel = PersistenceService
      .load('selectedDeliveryAreaModel');

    $scope.numberOfItems = TrayStorageService.getAllItems().length;

    $scope.infoDeliveryArea = true;
    $scope.toggleInfoDeliveryArea = function() {
      $scope.infoDeliveryArea = !$scope.infoDeliveryArea;
    };
    $scope.trayQuestion = true;
    $scope.toggleTrayQuestion = function() {
      $scope.trayQuestion = !$scope.trayQuestion;

      if (!$scope.trayQuestion) {
        $timeout(function() {
          document.getElementById('trayComment').focus();
        }, 200);
      }

    };

    // check if the store is delivering today
    $scope.openingHours = new OpeningHoursFactory(
      $scope.storeModel.deliveryTimesCollection);


    var serverTime = ServerTime.getServerTime();
    var minutes = DateUtilsService.roundToNext(serverTime.getMinutes() +
      $scope.deliveryAreaModel.minimumDuration, 5);
    serverTime.setMinutes(minutes);
    var now = $scope.openingHours.getNextDate(serverTime, 0);

    if (now) {
      $scope.deliveresToday = true;
    } else {
      $scope.deliveresToday = false;
    }


    $scope.formData = {};
    // add city
    $scope.formData.payment = 'cash';



    $scope.order = function() {

      $scope.$broadcast('show-errors-check-validity');

      var orderDate = new Date(PersistenceService.load('deliveryDate'));
      OrderService.order(orderDate, $scope.deliveryAreaModel,
        $scope.totalAmount, $scope.formData, $scope.allSingleItems,
        $scope.allSubItems, $scope.allMenuItems);

      TrayStorageService.removeAll();

      PersistenceService.save('formData', $scope.formData);
      PersistenceService.save('storeModel', $scope.storeModel);
      RoutingService.navigate(':storeAlias/danke');

    };


  }
];
