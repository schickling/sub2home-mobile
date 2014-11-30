'use strict';

module.exports = [
  function() {

    var difference = 0;

    return {

      setServerTime: function(timestamp) {
        var now = new Date();
        difference = (timestamp - now.getTime());
      },

      getServerTime: function() {
        var now = new Date();
        return new Date(now.getTime() + difference);
      }

    };

  }
];
