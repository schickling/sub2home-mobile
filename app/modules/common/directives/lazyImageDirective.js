'use strict';

module.exports = [

  function() {
    return {
      restrict: 'A',
      link: function($scope, $elem) {

        var container = $elem[0];
        var img = container.querySelector('img');
        var imgLoader = container.querySelector('.imageLoader');

        $elem.addClass('loading');

        if (img) {
          img.addEventListener('load', function() {
            $elem.removeClass('loading');
            if (imgLoader) {
              imgLoader.remove();
            }
            img.removeEventListener('load');
          });
        }

      }
    };

  }
];
