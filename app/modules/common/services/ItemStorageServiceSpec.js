'use strict';

describe('ItemStorageService', function() {

  beforeEach(module('app'));

  var ItemStorageService;
  beforeEach(inject(function(_ItemStorageService_) {
    ItemStorageService = _ItemStorageService_;
  }));


  it('should save, update, and delete a item', function() {
    ItemStorageService.removeItem(itemKey, item);

    expect(ItemStorageService.getAllItems(itemKey)).toEqual([]);

    ItemStorageService.saveItem(itemKey, item);

    expect(ItemStorageService.getAllItems(itemKey)).toEqual([item]);

    ItemStorageService.removeItem(itemKey, item);

    expect(ItemStorageService.getAllItems(itemKey)).toEqual([]);
  });

  var item = {
    simpleKey: 'Hello',
    deepKey: {
      world: 42
    }
  };

  var itemKey = 'ItemStorageServiceTestKey';

});
