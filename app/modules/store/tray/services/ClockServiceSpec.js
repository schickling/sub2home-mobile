'use strict';
describe('ClockService', function() {

  beforeEach(module('app'));

  var ClockService;
  var TestData;

  //new Date(year, month, day, hours, minutes, seconds, milliseconds)
  var monday = new Date(2014, 8, 8, 10, 10, 0, 0);
  var friday = new Date(2014, 8, 12, 10, 10, 0, 0);

  beforeEach(inject(function(_ClockService_, _ClockServiceTestData_) {
    ClockService = _ClockService_;
    TestData = _ClockServiceTestData_;
  }));


  describe('Test if time is rounded correctily', function() {
    it('Case: 1', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2014, 0, 0, 10, 11, 0, 0);
      ClockService.init(null, date);
      expect(ClockService.getCurrentTime()).toEqual(615);
    });

    it('Case: 2', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2014, 0, 0, 10, 10, 0, 0);
      ClockService.init(null, date);
      expect(ClockService.getCurrentTime()).toEqual(610);
    });

    it('Case: 3', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2014, 0, 0, 23, 59, 0, 0);
      ClockService.init(null, date);
      expect(ClockService.getCurrentTime()).toEqual(0);
    });
  });

  describe('Test convertion from the DeliveryTime Collection to today object', function() {
    it('Case: 1', function() {
      // 1 is monday
      var dayOfWeek = 1;
      var expectedOpeningHours = [{
        startMinutes: 690,
        endMinutes: 830
      }, {
        startMinutes: 1050,
        endMinutes: 1310
      }];

      ClockService.init(TestData.memmingenDeliveryTimeCollection, monday);

      var today = ClockService.getTodayObject();
      expect(today.dayOfWeek).toBe(dayOfWeek);
      expect(today.openingHours).toEqual(expectedOpeningHours);
    });

    it('Case: 2 (delivery Time after 00:00)', function() {
      var dayOfWeek = 5;
      var expectedOpeningHours = [{
        startMinutes: 660,
        endMinutes: 1439
      }, {
        dayOfWeek: 5,
        startMinutes: 0,
        endMinutes: 60
      }];

      ClockService.init(TestData.oberhausenDeliveryTimeCollection, friday);

      var today = ClockService.getTodayObject();
      //     expect(null).not.toBeNull();
    });
  });

  describe('Get the next delivery times', function() {
    it('Case: 1 (closed)', function() {
      //new Date(year, month, monday, hours, minutes, seconds, milliseconds)
      var date = new Date(2014, 8, 8, 10, 0, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date);

      expect(ClockService.getNextOpeningHour()).toEqual({
        startMinutes: 690,
        endMinutes: 830
      });
    });

    it('Case: 2 (open)', function() {
      //new Date(year, month, monday, hours, minutes, seconds, milliseconds)
      var date = new Date(2014, 8, 8, 12, 0, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date);

      expect(ClockService.getNextOpeningHour()).toEqual({
        startMinutes: 720,
        endMinutes: 830
      });
    });

    it('Case: 3 (no more deliveries today)', function() {
      //new Date(year, month, monday, hours, minutes, seconds, milliseconds)
      var date = new Date(2014, 8, 8, 22, 0, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date);

      expect(ClockService.getNextOpeningHour()).toBeNull();
    });

  });

  describe('Test if the time to deliver is calculated correctly', function() {
    it('Case: 1 MinimumDuration 45 min store not open yet', function() {
      var date = new Date(2014, 8, 8, 16, 10, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 45);

      expect(ClockService.getEarliestDeliveryTime()).toEqual(1050);
      expect(ClockService.getLatestDeliveryTime()).toEqual(1325);
    });

    it('Case: 2 MinimumDuration 15 min store not open yet', function() {
      var date = new Date(2014, 8, 8, 16, 10, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 15);

      expect(ClockService.getEarliestDeliveryTime()).toEqual(1050);
      expect(ClockService.getLatestDeliveryTime()).toEqual(1325);

    });

    it('Case: 3 MinumimDuration 30 min. Store is open', function() {
      var date = new Date(2014, 8, 8, 18, 0, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 30);

      expect(ClockService.getEarliestDeliveryTime()).toEqual(1110);
      expect(ClockService.getLatestDeliveryTime()).toEqual(1325);
    });

    it('Case: 4 MinumimDuration 15 min. Store closes in 20 min', function() {
      var date = new Date(2014, 8, 8, 21, 30, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 15);

      expect(ClockService.getEarliestDeliveryTime()).toEqual(1305);
      expect(ClockService.getLatestDeliveryTime()).toEqual(1325);
    });

    it('Case: 5 MinumimDuration 45 min. Store closes in 20 min', function() {
      var date = new Date(2014, 8, 8, 21, 30, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 45);

      expect(ClockService.getEarliestDeliveryTime()).toBeNull();
      expect(ClockService.getLatestDeliveryTime()).toBeNull();
    });

    it('Case: 6 Store is closed for today', function() {
      var date = new Date(2014, 8, 8, 23, 0, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 15);
      expect(ClockService.getNextOpeningHour()).toBeNull();
    });

    it('Case: 7 Store just opened', function() {
      var date = new Date(2014, 8, 8, 11, 30, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 45);

      expect(ClockService.getEarliestDeliveryTime()).toEqual(735);
      expect(ClockService.getLatestDeliveryTime()).toEqual(845);
    });

    it('Case: 8 Store opens in 15 min and teh delivery time is 45 min', function() {
      var date = new Date(2014, 8, 8, 11, 15, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 44);

      expect(ClockService.getEarliestDeliveryTime()).toEqual(720);
      expect(ClockService.getLatestDeliveryTime()).toEqual(845);
    });

    it('Case: 9 Last possible delivery time in the morning', function() {
      var date = new Date(2014, 8, 8, 13, 20, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 45);

      expect(ClockService.getEarliestDeliveryTime()).toEqual(845);
      expect(ClockService.getLatestDeliveryTime()).toEqual(845);
    });

    it('Case: 10 Orders in the morning but gets at noon', function() {
      var date = new Date(2014, 8, 8, 13, 25, 0, 0);
      ClockService.init(TestData.memmingenDeliveryTimeCollection, date, 45);

      expect(ClockService.getEarliestDeliveryTime()).toEqual(1050);
      expect(ClockService.getLatestDeliveryTime()).toEqual(1325);
    });
  });

});
