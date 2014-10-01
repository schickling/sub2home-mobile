'use strict';

module.exports = [

  function() {
    return {
      restrict: 'A',
      link: function($scope, $elem) {

        var img = $elem.children('img:first');

        $elem.addClass('loading');
        img.bind('load', function() {
          $elem.removeClass('loading');
          img.unbind('load');
        });

      }
    };

  }
];
