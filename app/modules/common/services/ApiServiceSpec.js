'use strict';

var ApiService = require('./ApiService')();

describe('ApiService', function() {

  it('should return the base API url', function() {
    expect(ApiService.buildUrl()).toBe('https://localhost:1071/');
  });

  it('should return a built url', function() {
    expect(ApiService.buildUrl('stores')).toBe('https://localhost:1071/stores');
  });

  it('should return a built url with a store alias', function() {
    ApiService.setStoreAlias('memmingen');
    expect(ApiService.buildUrl('stores/storeAlias/categories')).toBe('https://localhost:1071/stores/memmingen/categories');
  });

});