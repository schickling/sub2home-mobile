'use strict';

module.exports = [

  /*
   * Provides helper funtions to work with Date objects
   */
  function() {

    return {
     roundToNext: function (minutes, step) {

        minutes = minutes || 0;
        step = step || 0;

        return minutes + (step - minutes % step) % step;
      },

      /*
      * Returns the the day of the week of the given date object
      * from 23:56 it returns the next day
      */
      getDay: function(date) {
        if (date && date instanceof Date) {
          if (date.getMinutes() > 55) {
            return (date.getDay() + 1) % 7;
          } else {
            return date.getDay();
          }
        } else {
          throw 'Parameter must be a date';
        }
      },

      /*
      * Returns a new Date object with the day month and year form the date parameter
      * and the hours and minutes from the minutes parameter
      */
      getDate: function(d, minutes) {

        if (d && d instanceof Date) {
          var date = new Date(d);
          if (!minutes) {
            minutes = 0;
          }

          date.setMinutes(minutes % 60);
          date.setHours(minutes / 60);

          return date;

        } else {
          throw 'Parameter must be a date';
        }

      },

      addMinutes: function(d, minutes) {

        if (d && d instanceof Date) {
          var date = new Date(d);
          date.setMinutes(date.getMinutes() + minutes);
          return date;
        } else {
          throw 'Parameter must be a date';
        }

      }
    };
  }

];
