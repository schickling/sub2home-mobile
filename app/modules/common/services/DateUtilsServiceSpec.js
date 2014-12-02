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
});
