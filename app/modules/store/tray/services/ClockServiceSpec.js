'use strict';
describe('ClockService', function() {

  beforeEach(module('app'));

  var ClockService;
  var TestData;
  beforeEach(inject(function(_ClockService_, _ClockServiceTestData_) {
    ClockService = _ClockService_;
    TestData = _ClockServiceTestData_;
  }));


  it('should save and return and delete an object', function() {
    console.log(TestData);
  });
});
