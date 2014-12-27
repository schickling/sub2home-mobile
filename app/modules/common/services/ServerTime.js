'use strict';

/**
 * This Module synchronizes the client time with the server time.
 * To prevent errors when the user orders we have always to show him
 * the server time and not his client time.
 **/
module.exports = [

  function() {

    var difference = 0;

    return {

      /**
       * Sets the difference between the server and client time
       * Takes the server time string form an xhr request as a parameter
       **/
      setServerTime: function(serverDate, serverGMT) {
        // get the time difference between server and client
        var now = new Date();
        difference = (serverDate.getTime() - now.getTime());

        // get the timezone difference between the server and the client
        var clientGMT = (((now.getHours() - now.getUTCHours()) % 24) + 24) %
          24;
        difference += (serverGMT - clientGMT) * 60 * 60 * 1000;
      },


      /**
       * Returns the normalized time from the server
       **/
      getServerTime: function() {
        var now = new Date();
        return new Date(now.getTime() + difference);
        //return new Date(2014, 9, 9, 22, 0, 0);
      }

    };

  }
];
