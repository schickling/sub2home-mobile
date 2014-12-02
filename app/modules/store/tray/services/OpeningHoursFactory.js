'use strict';
module.exports = ['_', function() {

  var openingHours = function(deliveryTimeCollection) {
    this.deliveryTimeCollection = deliveryTimeCollection;
  };

  openingHours.prototype.getNext = function(minutes, minimumDuration) {

  };

  openingHours.prototype.getLastInThisPeriod = function(minutes, minimumDuration) {

  };

  return openingHours;
}];
//module.exports = ['_',

  //function(_) {

    //var today = null;
    //var currentTime = null;
    //var minimumDuration = null;

    //var dateToMinutes = function(date) {
      //if (date) {
        //var result = date.getMinutes() + date.getHours() * 60;
        //// round to 5 minutes
        //result = result + (5 - result % 5) % 5;

        //return result % 1440;

      //} else {
        //return null;
      //}
    //};

    //var deliveryTimeCollectionToToday = function(deliveryTimeCollection, dayOfWeek) {
      //if (deliveryTimeCollection) {
        //var openingHours = _.chain(deliveryTimeCollection)
          //.where({
            //dayOfWeek: dayOfWeek
          //})
          //.map(function(value) {
            //return {
              //startMinutes: value.startMinutes,
              //endMinutes: value.endMinutes
            //};
          //})
          //.sortBy(function(valjjue) {
            //return value.startMinutes;
          //})
          //.value();

        //// TODO add opening hours when store is open after 00:00

        //return {
          //dayOfWeek: dayOfWeek,
          //openingHours: openingHours
        //};
      //}
      //return null;
    //};

    //return {
      //init: function(deliveryTimeCollection, date, minDuration) {
        //currentTime = dateToMinutes(date);
        //today = deliveryTimeCollectionToToday(deliveryTimeCollection, date.getDay());
        //minimumDuration = minDuration;
      //},

      //getEarliestDeliveryTime: function() {
        //var openingHour = this.getNextOpeningHour();

        //if (openingHour.endMinutes + 15 >= currentTime + minimumDuration) {
          //if (openingHour.startMinutes < currentTime + minimumDuration) {
            //return (currentTime + minimumDuration);
          //} else {
            //return openingHour.startMinutes;
          //}
        //} else {
          //return null;
        //}
      //},

      //getLatestDeliveryTime: function() {
        //var openingHour = this.getNextOpeningHour();

        //if (openingHour) {
          //if (currentTime + minimumDuration > openingHour.endMinutes + 15) {
            //return null;
          //} else {
            //return openingHour.endMinutes + 15;
          //}
        //} else {
          //return null;
        //}
      //},

      //getNextOpeningHour: function() {
        //var result = _.filter(today.openingHours, function(value) {
          //return currentTime + minimumDuration >= value.startMinutes && currentTime <= value.endMinutes;
        //});

        //if (result.length > 0) {
          //result[0].startMinutes = currentTime;
          //return result[0];
        //} else {
          //var next = _.find(today.openingHours, function(value) {return value.startMinutes > currentTime});
          //return next ? next : null;
        //}
      //},

      //getTodayObject: function() {
        //return today;
      //},

      //getCurrentTime: function() {
        //return currentTime;
      //}
    //};

  //}

//];
