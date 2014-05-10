'use strict';

describe('PersistenceService', function() {

  beforeEach(module('app'));

  var PersistenceService;
  beforeEach(inject(function (_PersistenceService_) {
    PersistenceService = _PersistenceService_;
  }));

  it('should save and return an object', function() {

    var object = {
      simpleKey: 'Hello',
      deepKey: {
        world: 42
      }
    };

    PersistenceService.save('object', object);

    expect(PersistenceService.load('object')).toEqual(object);

  });

});