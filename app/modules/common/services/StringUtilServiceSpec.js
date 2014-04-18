'use strict';

var StringUtilService = require('./StringUtilService')();

describe('StringUtilService', function() {

  it('should pad a to short number', function() {
    expect(StringUtilService.padNumber(1, 2)).toBe('01');
  });

});