'use strict';

module.exports = ['$timeout',

  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'modules/store/tray/directives/editOptions.html',
      link: function($scope, $elem, $attrs) {

        $scope.toggleEdit = function() {
          if ($scope.edit) {
            $scope.editBwd = true;
            $timeout(function() {
              $scope.edit = false;
              $scope.editBwd = false;
            }, 400);
          } else {
            $scope.edit = true;
          }
        };

        $scope.showRemove = function() {
          $scope.remove = true;
        };

        $scope.hideRemove = function() {
          $scope.removeBwd = true;
          $timeout(function() {
            $scope.remove = false;
            $scope.removeBwd = false;
          }, 400);

        };

      }
    };

  }
];
