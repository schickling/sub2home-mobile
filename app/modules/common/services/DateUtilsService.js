'use strict';

module.exports = [

  function() {

    return {
      // minutes are rounded by the precision of 5
      dateToMinutes: function(date) {
        if (date && date instanceof Date) {
          var result = date.getMinutes() + date.getHours() * 60;
          // round to 5 minutes
          result = result + (5 - result % 5) % 5;

          return result % 1440;

        } else {
          throw 'Parameter must be a date';
        }
      },

      getDay: function() {
        // TODO be careful when the time is for example 23:59 dateToMinutes returns 0
        // so getDay() must return the next day
      }
    };

    }
];
