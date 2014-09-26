'use strict';
describe('ClockService', function() {

    beforeEach(module('app'));

    var ClockService;
    var TestData;
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

});
