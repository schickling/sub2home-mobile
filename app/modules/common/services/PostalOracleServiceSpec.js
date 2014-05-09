'use strict';

describe('PostalOracleService', function() {

  beforeEach(module('app'));

  var PostalOracleService, localStorageService, $rootScope;
  beforeEach(inject(function(_PostalOracleService_, _localStorageService_, _$rootScope_) {
    PostalOracleService = _PostalOracleService_;
    localStorageService = _localStorageService_;
    $rootScope = _$rootScope_;
  }));

  it('should return the cached postal', function() {

    localStorageService.set('postal', 99999);

    var overwritePostal = false;
    var result;

    PostalOracleService.query(overwritePostal).then(function(postal) {
      result = parseInt(postal, 10);
    });

    $rootScope.$apply();
    expect(result).toBe(99999);

  });

});