'use strict';

describe('ApiService', function() {

  beforeEach(module('app'));

  var ApiService;
  beforeEach(inject(function (_ApiService_) {
    ApiService = _ApiService_;
  }));

  it('should return the base API url', function() {
    expect(ApiService.buildUrl()).toBe('http://localhost:1071/');
  });

  it('should return a built url', function() {
    expect(ApiService.buildUrl('stores')).toBe('http://localhost:1071/stores');
  });

  it('should return a built url with a store alias', function() {
    ApiService.setStoreAlias('memmingen');
    expect(ApiService.buildUrl('stores/storeAlias/categories')).toBe('http://localhost:1071/stores/memmingen/categories');
  });

});