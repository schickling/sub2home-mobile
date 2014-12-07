'use strict';
module.exports = ['_', 'DateUtilsService',

  function(_, DateUtilsService) {

  var openingHours = function(deliveryTimeCollection) {
    this.deliveryTimeCollection = deliveryTimeCollection;
  };

  // make day to date but ignore hours and minutes
  openingHours.prototype.getNext = function(date, minimumDuration) {

    if (date && date instanceof Date) {
      if (!minimumDuration) {
        minimumDuration = 0;
      }

      var result = null;
      var daysInFutur = 0;

      do {
        result = this._getNextToday(date, minimumDuration);
        date.setDate(date.getDate() + 1);
        date.setMinutes(0);
        date.setHours(0);

        daysInFutur++;
      } while (!result && daysInFutur < 8);

      if (daysInFutur < 8) {
        return result;
      } else {
        return null;
      }
    } else {
      throw 'Parameter must be a date';
    }
  };


  openingHours.prototype._getNextToday = function(date, minimumDuration) {

      var minutes = DateUtilsService.dateToMinutes(date) + minimumDuration;
      var day = DateUtilsService.getDay(date);

      // check if the delivery time is after midnight
      if (minutes >= 1440) {
        minutes %= 1440;
        day = (day + 1) % 7;
        date.setDate(date.getDate() + 1);
      }

      // check if the store is delivering at the moment
      var isDelivering = _.filter(this.deliveryTimeCollection, function(obj) {
          return obj.dayOfWeek === day && obj.startMinutes <= minutes && minutes <= obj.endMinutes;
        });

      if (isDelivering.length === 0) {
        // check if it delivers later that day
        var deliversLaterThatDay = _.chain(this.deliveryTimeCollection)
            .filter(function(obj) {
              return obj.dayOfWeek === day && obj.startMinutes > minutes;
            })
            .sortBy(function(obj) {
              return obj.startMinutes;
            }).value();

        if (deliversLaterThatDay.length > 0) {
          return DateUtilsService.getDate(date, deliversLaterThatDay[0].startMinutes);
        } else {
          return null;
        }
      } else {
        return DateUtilsService.getDate(date, minutes);
      }

    };



  return openingHours;
}];
