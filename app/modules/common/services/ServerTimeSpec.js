'use strict';

describe('ServerTime', function() {

  beforeEach(module('app'));

  var ServerTime;
  beforeEach(inject(function(_ServerTime_) {
    ServerTime = _ServerTime_;
  }));

  describe('Server and Client are in the same timezone', function() {
    it('Server and Client have the same time', function() {
      var now = new Date();

      var serverDate = new Date(now);

      var offset = -now.getTimezoneOffset() / 60 + 0;
      ServerTime.setServerTime(serverDate, offset);

      var resultDate = ServerTime.getServerTime();
      expect(resultDate.getHours()).toBe(serverDate.getHours());
      expect(resultDate.getMinutes()).toBe(serverDate.getMinutes());
      expect(resultDate.getDate()).toBe(serverDate.getDate());
    });

    it('Server and Client have a different time', function() {
      var now = new Date();

      var serverDate = new Date(now);
      serverDate.setHours(serverDate.getHours() - 2);

      var offset = -now.getTimezoneOffset() / 60 + 0;
      ServerTime.setServerTime(serverDate, offset);

      var resultDate = ServerTime.getServerTime();
      expect(resultDate.getHours()).toBe(serverDate.getHours());
      expect(resultDate.getMinutes()).toBe(serverDate.getMinutes());
      expect(resultDate.getDate()).toBe(serverDate.getDate());
    });
  });

  describe('Server and Client are in a different timezone', function() {
    it('Server and Client have the same time', function() {
      var now = new Date();

      var serverDate = new Date(now);

      var offset = -now.getTimezoneOffset() / 60 + 1;
      ServerTime.setServerTime(serverDate, offset);

      var resultDate = ServerTime.getServerTime();

      serverDate.setHours(serverDate.getHours() + 1);

      expect(resultDate.getHours()).toBe(serverDate.getHours());
      expect(resultDate.getMinutes()).toBe(serverDate.getMinutes());
      expect(resultDate.getDate()).toBe(serverDate.getDate());
    });

    it('Server and Client have a different time', function() {
      var now = new Date();

      var serverDate = new Date(now);
      serverDate.setHours(serverDate.getHours() + 1);

      var offset = -now.getTimezoneOffset() / 60 + 1;
      ServerTime.setServerTime(serverDate, offset);

      var resultDate = ServerTime.getServerTime();

      serverDate.setHours(serverDate.getHours() + 1);

      expect(resultDate.getHours()).toBe(serverDate.getHours());
      expect(resultDate.getMinutes()).toBe(serverDate.getMinutes());
      expect(resultDate.getDate()).toBe(serverDate.getDate());
    });

  });
});
