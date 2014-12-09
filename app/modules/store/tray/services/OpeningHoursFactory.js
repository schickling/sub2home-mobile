'use strict';
module.exports = ['_', 'DateUtilsService',

  /*
   * OpeningHoursFactory takes the deliveryTimeCollection of a store
   * It gives you the next Date when the delivery can be delivered
   */
  function(_, DateUtilsService) {

    var openingHours = function(deliveryTimeCollection) {
      this.deliveryTimeCollection = deliveryTimeCollection;
    };

    /*
     * Returns the next possible date when the store is delivering
     * If the deliveryTimeCollection of the store is empty it reutrns null
     */
    openingHours.prototype.getNextDate = function(relativeDate, daysInFuture, minimumDuration) {

      if (relativeDate && relativeDate instanceof Date) {
        daysInFuture = daysInFuture || 0;
        minimumDuration = minimumDuration || 0;

        // filterFuntion to find the next delivery time
        var filterFunctionNext = function(obj, day, minutes) {
          if (day && minutes) {
            return obj.dayOfWeek === day && obj.startMinutes > minutes;
          } else {
            return obj.startMinutes;
          }
        };

        var nextDate = this._getThisDay(relativeDate, minimumDuration, filterFunctionNext);

        if (!nextDate && daysInFuture > 0) {
          relativeDate = new Date(relativeDate);
          relativeDate.setDate(relativeDate.getDate() + 1);
          relativeDate.setMinutes(0);
          relativeDate.setHours(0);

          return this.getNextDate(relativeDate, --daysInFuture, minimumDuration);
        } else {
          return nextDate;
        }
      } else {
        throw new Error('Parameter must be a date');
      }
    };


    /*
     * This is a private helper method that checks if the delivery can be delivered that day
     * when not it returns null
     */
    openingHours.prototype._getThisDay = function(date, minimumDuration, filterFunction) {

      date.setMinutes(date.getMinutes() + minimumDuration);

      var minutes = DateUtilsService.dateToMinutes(date);
      var day = DateUtilsService.getDay(date);

      // check if the store is delivering at the moment
      var isDelivering = _.any(this.deliveryTimeCollection, function(obj) {
        return obj.dayOfWeek === day && obj.startMinutes <= minutes && minutes <= obj.endMinutes;
      });

      if (!isDelivering) {
        // check if it delivers later that day
        var nextDeliveryTime = _(this.deliveryTimeCollection)
          .filter(function(obj) {
            return filterFunction(obj, day, minutes);
          })
          .sortBy(function(obj) {
            return filterFunction(obj);
          }).first();

        if (nextDeliveryTime) {
          return DateUtilsService.getDate(date, nextDeliveryTime.startMinutes);
        } else {
          return null;
        }
      } else {
        return DateUtilsService.getDate(date, minutes);
      }

    };


    return openingHours;
  }
];
