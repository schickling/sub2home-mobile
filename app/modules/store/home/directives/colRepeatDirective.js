'use strict';

module.exports = ['$window',

  function($window) {
    return {
      transclude: true,
      templateUrl: 'modules/store/home/directives/colRepeatDirective.html',
      scope: {
        items: '=appItems',
        col: '=appCol',
      },
      link: function($scope, $elem, $attrs) {

        var maxWidth = 300;
        var numberOfCols = parseInt($window.innerWidth / maxWidth, 10);
        var cols = [];

        for (var i = 0; i < numberOfCols; i++) {
          cols.push([]);
        }

        $scope.items.forEach(function(item, index) {
          cols[index % numberOfCols].push(item);
        });

        $scope.cols = cols;

      }
    };

  }
];