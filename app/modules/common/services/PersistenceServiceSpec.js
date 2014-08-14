'use strict';

describe('PersistenceService', function() {

  beforeEach(module('app'));

  var PersistenceService;
  beforeEach(inject(function(_PersistenceService_) {
    PersistenceService = _PersistenceService_;
  }));

  it('should save and return and delete an object', function() {

    var object = {
      simpleKey: 'Hello',
      deepKey: {
        world: 42
      }
    };

    var key = 'object';

    PersistenceService.save(key, object);

    expect(PersistenceService.load(key)).toEqual(object);

    PersistenceService.remove(key);

    expect(PersistenceService.load(key)).toBeNull();
  });

});
