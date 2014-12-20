'use strict';

describe('ServerTime', function() {

  beforeEach(module('app'));

  var ServerTime;
  beforeEach(inject(function(_ServerTime_) {
    ServerTime = _ServerTime_;
  }));

  describe('the client time is different to the server time', function() {
    it('Client time is two hours later then server time', function() {
      var now = new Date();

      var serverDate = new Date(now);
      serverDate.setHours(serverDate.getHours() - 2);

      ServerTime.setServerTime(serverDate);

      var resultDate = ServerTime.getServerTime();
      expect(resultDate.getHours()).toBe(serverDate.getHours());
      expect(resultDate.getMinutes()).toBe(serverDate.getMinutes());
      expect(resultDate.getDate()).toBe(serverDate.getDate());
    });
  });

  describe('the client has another timezone then the server', function() {
    it('set server UTC time', function() {
      var now = new Date();

      var serverDate = new Date(now);
      serverDate.setUTCHours(12);

      ServerTime.setServerTime(serverDate);

      var resultDate = ServerTime.getServerTime();

      expect(resultDate.getHours()).toBe(serverDate.getHours());
      expect(resultDate.getMinutes()).toBe(serverDate.getMinutes());
      expect(resultDate.getDate()).toBe(serverDate.getDate());
    });
  });
});
