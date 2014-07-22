'use strict';

module.exports = ['$window',

  function($window) {
    return {
      transclude: true,
      templateUrl: 'modules/store/home/directives/colRepeatDirective.html',
      scope: {
        itemsCollection: '=appItemsCollection',
        col: '=appCol',
        watch: '=watch',
      },
      link: function($scope, $elem, $attrs) {

        if ($scope.watch) {
          $scope.$watch('itemsCollection', function(newValue) {
            if (newValue) {
              updateCols();
            }
          });
        }

        var updateCols = function() {
          var maxWidth = 320;
          var numberOfCols = parseInt($window.innerWidth / maxWidth, 10);
          var cols = [];

          for (var i = 0; i < numberOfCols; i++) {
            cols.push([]);
          }

          if ($scope.itemsCollection) {
            $scope.itemsCollection.forEach(function(itemModel, index) {
              cols[index % numberOfCols].push(itemModel);
            });
          }

          $scope.cols = cols;

        };

        updateCols();
      }
    };

  }
];
