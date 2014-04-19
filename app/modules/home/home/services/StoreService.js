'use strict';

var _ = require('lodash');

module.exports = function() {

  return {

    nextDeliveryTime: function(store, now) {
      var deliveryTimes = store.deliveryTimesCollection,
        day = now.getDay(),
        minutes = now.getHours() * 60 + now.getMinutes();

      deliveryTimes = deliveryTimes.sort((a, b) => a.startMinutes - b.startMinutes);

      for (var i = 0; i < 7; i++) {
        var filteredDeliveryTimes = deliveryTimes.filter(deliveryTime => {
          return day === deliveryTime.dayOfWeek &&
            ((i === 0 && deliveryTime.startMinutes >= minutes) || i !== 0);
        });
        if (filteredDeliveryTimes.length > 0) {
          return filteredDeliveryTimes[0];
        }
        day = (day + 1) % 7;
      }

      return null;
    },

    isDelivering: function(store, now) {
      if (!store.isOpen) {
        return false;
      }

      var day = now.getDay(),
        minutes = now.getHours() * 60 + now.getMinutes();

      for (var i = 0; i < store.deliveryTimesCollection.length; i++) {
        var deliveryTime = store.deliveryTimesCollection[i];
        if (deliveryTime.dayOfWeek === day &&
          deliveryTime.startMinutes <= minutes &&
          deliveryTime.endMinutes >= minutes) {
          return true;
        }
      }

      return false;
    },

    deliversTo: function(store, deliveryArea) {
      for (var i = 0; i < store.deliveryAreasCollection.length; i++) {
        var keys = ['district', 'city', 'postal'];
        if (_.isEqual(_.pick(deliveryArea, keys), _.pick(store.deliveryAreasCollection[i], keys))) {
          return true;
        }
      }

      return false;
    },

  };

};