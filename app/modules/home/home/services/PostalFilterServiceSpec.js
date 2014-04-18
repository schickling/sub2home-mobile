var PostalFilterService = require('./PostalFilterService')();

describe('PostalFilterService', function() {

  beforeEach(function() {
    var stores = [{
      deliveryAreasCollection: [{
        postal: 10000,
        district: 'a'
      }, {
        postal: 10001,
        district: 'b1'
      }, {
        postal: 10001,
        district: 'b2'
      }, {
        postal: 10001,
        district: 'b3'
      }, {
        postal: 10002,
        district: 'c'
      }, {
        postal: 10003,
        district: 'd'
      }]
    }, {
      deliveryAreasCollection: [{
        postal: 10000,
        district: 'e1'
      }, {
        postal: 10000,
        district: 'e2'
      }, {
        postal: 10002,
        district: 'f'
      }]
    }, {
      deliveryAreasCollection: []
    }];
    PostalFilterService.init(stores);
  });

  it('should return no store and no delivery area', function() {
    PostalFilterService.filter(10004);
    expect(PostalFilterService.getStores().length).toBe(0);
    expect(PostalFilterService.getDeliveryAreas().length).toBe(0);
  });

  it('should return one store and one delivery area', function() {
    PostalFilterService.filter(10003);
    expect(PostalFilterService.getStores().length).toBe(1);
    expect(PostalFilterService.getDeliveryAreas().length).toBe(1);
  });

  it('should return one store and three delivery areas', function() {
    PostalFilterService.filter(10001);
    expect(PostalFilterService.getStores().length).toBe(1);
    expect(PostalFilterService.getDeliveryAreas().length).toBe(3);
  });

  it('should return two stores and three delivery areas', function() {
    PostalFilterService.filter(10000);
    expect(PostalFilterService.getStores().length).toBe(2);
    expect(PostalFilterService.getDeliveryAreas().length).toBe(3);
  });

});