'use strict';

describe('ApiService', function() {

  beforeEach(module('app'));

  var ApiService;
  beforeEach(inject(function (_ApiService_) {
    ApiService = _ApiService_;
  }));

  it('should return the base API url', function() {
    expect(ApiService.buildUrl()).toBe('https://localhost:1070/');
  });

  it('should return a built url', function() {
    expect(ApiService.buildUrl('stores')).toBe('https://localhost:1070/stores');
  });

});
