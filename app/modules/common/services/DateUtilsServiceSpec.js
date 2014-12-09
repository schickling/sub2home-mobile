'use strict';


describe('Test DateUtilsService', function() {

  beforeEach(module('app'));

  var DateUtilsService;
  beforeEach(inject(function(_DateUtilsService_) {
    DateUtilsService = _DateUtilsService_;
  }));



  describe('the function .dateToMinutes(date)', function() {
    it('Case 1: Convert date to minutes of day', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2000, 1, 1, 0, 0, 0, 0);

      expect(DateUtilsService.dateToMinutes(date)).toBe(0);
    });

    it('Case 2: Convert date to minutes of day', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2000, 1, 1, 3, 34, 0, 0);

      expect(DateUtilsService.dateToMinutes(date)).toBe(215);
    });

    it('Case 3: Convert date to minutes of day', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2000, 1, 1, 12, 10, 0, 0);

      expect(DateUtilsService.dateToMinutes(date)).toBe(730);
    });

    it('Case 4: Convert date to minutes of day', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2000, 1, 1, 23, 59, 0, 0);

      expect(DateUtilsService.dateToMinutes(date)).toBe(0);
    });

    it('Case 5: Throw error', function() {
      expect(DateUtilsService.dateToMinutes).toThrow();
    });

    it('Case 6: Throw error', function() {
      expect(function() {DateUtilsService.dateToMinutes('test data');}).toThrow();
    });
  });

  describe('the function .getDay(date)', function() {
    it('Case 1', function() {
      //sunday = new Date(2014, 10, 30, 12, 0, 0, 0);
      var date = new Date(2014, 10, 30, 12, 0, 0, 0);

      expect(DateUtilsService.getDay(date)).toBe(0);
    });

    it('Case 2', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2014, 11, 6, 12, 0, 0, 0);

      expect(DateUtilsService.getDay(date)).toBe(6);
    });

    it('Case 3', function() {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      var date = new Date(2014, 11, 1, 23, 56, 0, 0);

      expect(DateUtilsService.getDay(date)).toBe(2);
    });

    it('Case 5: Throw error', function() {
      expect(DateUtilsService.getDay).toThrow();
    });

    it('Case 6: Throw error', function() {
      expect(function() {DateUtilsService.getDay('test data');}).toThrow();
    });
  });

  describe('the function .getDate(date, minutes)', function() {
    it('Case 1', function() {
      var date = new Date(2014, 10, 30, 12, 0, 0, 0);
      var minutes = 804;
      var result = new Date(2014, 10, 30, 13, 24, 0, 0);

      expect(DateUtilsService.getDate(date, minutes)).toEqual(result);
    });

    it('Case 2', function() {
      var date = new Date(2014, 10, 30, 12, 0, 0, 0);
      var minutes = 1434;
      var result = new Date(2014, 10, 30, 23, 54, 0, 0);

      expect(DateUtilsService.getDate(date, minutes)).toEqual(result);
    });

    it('Case 3', function() {
      expect(DateUtilsService.getDate).toThrow();
    });
  });

  describe('the function .addMinutes(date, minutes)', function() {
    it('Case 1: add minutes', function() {
      var date = new Date(2014, 10, 30, 12, 50, 0, 0);
      var result = new Date(2014, 10, 30, 13, 1, 0, 0);

      var tmp = DateUtilsService.addMinutes(date, 11);
      expect(tmp).toEqual(result);
    });

    it('Case 2: add minutes', function() {
      var date = new Date(2014, 10, 30, 12, 50, 0, 0);
      var result = new Date(2014, 10, 30, 12, 55, 0, 0);

      expect(DateUtilsService.addMinutes(date, 5)).toEqual(result);
    });

    it('Case 3: subtract minutes ', function() {
      var date = new Date(2014, 10, 30, 0, 50, 0, 0);
      var result = new Date(2014, 10, 29, 23, 50, 0, 0);

      expect(DateUtilsService.addMinutes(date, -60)).toEqual(result);
    });

    it('Case 4: Throw error', function() {
      expect(DateUtilsService.addMinutes).toThrow();
    });

  });
});
