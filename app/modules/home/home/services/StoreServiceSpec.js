'use strict';

var StoreService = require('./StoreService')[1]();

describe('StoreService', function() {

  var deliveryTimesCollection = [{
    dayOfWeek: 0,
    startMinutes: 690,
    endMinutes: 840
  }, {
    dayOfWeek: 0,
    startMinutes: 1020,
    endMinutes: 1320
  }, {
    dayOfWeek: 1,
    startMinutes: 690,
    endMinutes: 840
  }, {
    dayOfWeek: 1,
    startMinutes: 1020,
    endMinutes: 1320
  }, {
    dayOfWeek: 2,
    startMinutes: 690,
    endMinutes: 840
  }, {
    dayOfWeek: 2,
    startMinutes: 1020,
    endMinutes: 1320
  }, {
    dayOfWeek: 3,
    startMinutes: 690,
    endMinutes: 840
  }, {
    dayOfWeek: 3,
    startMinutes: 1020,
    endMinutes: 1320
  }, {
    dayOfWeek: 4,
    startMinutes: 690,
    endMinutes: 840
  }, {
    dayOfWeek: 4,
    startMinutes: 1020,
    endMinutes: 1320
  }, {
    dayOfWeek: 5,
    startMinutes: 690,
    endMinutes: 840
  }, {
    dayOfWeek: 5,
    startMinutes: 1020,
    endMinutes: 1320
  }, {
    dayOfWeek: 6,
    startMinutes: 690,
    endMinutes: 840
  }, {
    dayOfWeek: 6,
    startMinutes: 1020,
    endMinutes: 1320
  }];

  describe('nextDeliveryTime', function() {

    it('should return a delivery time of the same day', function() {
      var now = new Date('Fri Apr 18 2014 16:59:59 GMT+0200 (CEST)'),
        store = {
          deliveryTimesCollection
        };
      expect(StoreService.nextDeliveryTime(store, now)).toEqual({
        dayOfWeek: 5,
        startMinutes: 1020,
        endMinutes: 1320
      });
    });

  });

  describe('isDelivering', function() {

    it('should return false because store is closed', function() {
      var now = new Date('Fri Apr 18 2014 20:14:28 GMT+0200 (CEST)'),
        store = {
          isOpen: false,
          deliveryTimesCollection
        };
      expect(StoreService.isDelivering(store, now)).toBe(false);
    });

    it('should return true', function() {
      var now = new Date('Fri Apr 18 2014 20:14:28 GMT+0200 (CEST)'),
        store = {
          isOpen: true,
          deliveryTimesCollection
        };
      expect(StoreService.isDelivering(store, now)).toBe(true);
    });

    it('should return false', function() {
      var now = new Date('Fri Apr 18 2014 16:59:59 GMT+0200 (CEST)'),
        store = {
          isOpen: true,
          deliveryTimesCollection
        };
      expect(StoreService.isDelivering(store, now)).toBe(false);
    });

  });

  describe('deliversTo', function() {

    var deliveryAreasCollection = [{
      postal: 87700,
      district: 'district-a',
      city: 'city-1'
    }, {
      postal: 87700,
      district: 'district-b',
      city: 'city-1'
    }, {
      postal: 87700,
      district: 'district-a',
      city: 'city-2'
    }, {
      postal: 87701,
      district: 'district-a',
      city: 'city-3'
    }, {
      postal: 87701,
      district: 'district-b',
      city: 'city-3'
    }];

    it('should return true', function() {
      var deliveryArea = {
        postal: 87700,
        district: 'district-a',
        city: 'city-1'
      };
      var store = {
        deliveryAreasCollection
      };
      expect(StoreService.deliversTo(store, deliveryArea)).toBe(true);
    });

    it('should return false', function() {
      var deliveryArea = {
        postal: 87702,
        district: 'district-a',
        city: 'city-1'
      };
      var store = {
        deliveryAreasCollection
      };
      expect(StoreService.deliversTo(store, deliveryArea)).toBe(false);
    });

    it('should return false', function() {
      var deliveryArea = {
        postal: 87700,
        district: 'district-c',
        city: 'city-1'
      };
      var store = {
        deliveryAreasCollection
      };
      expect(StoreService.deliversTo(store, deliveryArea)).toBe(false);
    });

    it('should return false', function() {
      var deliveryArea = {
        postal: 87700,
        district: 'district-a',
        city: 'city-4'
      };
      var store = {
        deliveryAreasCollection
      };
      expect(StoreService.deliversTo(store, deliveryArea)).toBe(false);
    });

  });

});