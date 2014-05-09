'use strict';

module.exports = [

  function() {
    return {
      link: function($scope, $elem, $attrs) {

        var offset = parseInt($attrs.threshold) || 0;
        var el = $elem[0];

        $elem.on('scroll', function() {
          if (el.scrollTop + el.offsetHeight >= el.scrollHeight - offset) {
            $scope.$apply($attrs.infiniteScroll);
          }
        });

      }
    }
  }
];