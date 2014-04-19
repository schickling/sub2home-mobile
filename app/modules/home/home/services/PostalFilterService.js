'use strict';

var _ = require('lodash');

module.exports = function() {

  return {

    allStores: null,
    stores: null,
    deliveryAreas: null,

    init: function(stores) {
      this.allStores = stores;
    },

    filter: function(postal) {
      var deliveryAreas = [],
        stores = [];

      this.allStores.forEach(function(store) {
        var filteredDeliveryAreas = store.deliveryAreasCollection.filter(d => d.postal === postal);
        if (filteredDeliveryAreas.length > 0) {
          stores.push(store);

          var keys = ['postal', 'city', 'district'];
          filteredDeliveryAreas.forEach(function(deliveryArea) {
            if (!_.findWhere(deliveryAreas, _.pick(deliveryArea, keys))) {
              deliveryAreas.push(deliveryArea);
            }
          });
        }
      });
      this.stores = stores;
      this.deliveryAreas = deliveryAreas;
    },

    getStores: function() {
      return this.stores;
    },

    getDeliveryAreas: function() {
      return this.deliveryAreas;
    }

  };

};