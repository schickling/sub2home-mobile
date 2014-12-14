'use strict';

module.exports = [

  function() {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/tray/directives/deliveryAddressForm.html',
      link: function($scope) {

        $scope.showAdditionalAddress = false;

        $scope.clickOpenAddidionalAddress = function() {
          $scope.showAdditionalAddress = true;
        };
      }
    };

  }
];
