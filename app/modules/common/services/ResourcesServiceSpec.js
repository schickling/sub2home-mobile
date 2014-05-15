'use strict';

describe('ResourcesService', function() {

  beforeEach(module('app'));

  var ResourcesService, $httpBackend;
  beforeEach(inject(function(_ResourcesService_, _$httpBackend_) {
    ResourcesService = _ResourcesService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should return a resolving promise', function() {

    $httpBackend.when('GET', 'http://localhost:1071/test').respond({
      hello: 'world'
    });

    var result;

    ResourcesService.get('test').then(function(response) {
      result = response;
    });

    $httpBackend.flush();

    expect(result.data.hello).toBe('world');

  });

});