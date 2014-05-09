'use strict';

describe('StringUtilService', function() {

  beforeEach(module('app'));

  var StringUtilService;
  beforeEach(inject(function (_StringUtilService_) {
    StringUtilService = _StringUtilService_;
  }));

  it('should pad a to short number', function() {
    expect(StringUtilService.padNumber(1, 2)).toBe('01');
  });

});