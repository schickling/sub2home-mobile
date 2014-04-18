'use strict';

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
          deliveryAreas = deliveryAreas.concat(filteredDeliveryAreas);
          stores.push(store);
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