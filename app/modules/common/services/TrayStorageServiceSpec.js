'use strict';

describe('TrayStorageService', function() {
  var item = {
    'id': 109,
    'title': 'Coca Cola',
    'largeImage': 'https://s3-eu-west-1.amazonaws.com/sub2home-static/images/articles/largeimages/beverages/coke-b.png',
    'info': '0.5l',
    'description': 'das Original: koffeinhaltiges Erfrischungsgetränk',
    'price': 2,
    'deposit': 0.25,
    'allowsIngredients': 0,
    'icon': 'beverage'
  };

  beforeEach(module('app'));

  var TrayStorageService;
  beforeEach(inject(function(_TrayStorageService_) {
    TrayStorageService = _TrayStorageService_;
  }));

  it('should save, update, and delete single Items', function() {

    TrayStorageService.removeSingleItem(item);

    expect(TrayStorageService.getAllSingleItems()).toEqual([]);

    TrayStorageService.saveSingleItem(item);

    expect(TrayStorageService.getAllSingleItems()).toEqual([item]);
    TrayStorageService.removeSingleItem(item);

    expect(TrayStorageService.getAllSingleItems()).toEqual([]);
  });

  it('should save, update, and delete Sub Items', function() {

    TrayStorageService.removeSubItem(item);

    expect(TrayStorageService.getAllSubItems()).toEqual([]);

    TrayStorageService.saveSubItem(item);

    expect(TrayStorageService.getAllSubItems()).toEqual([item]);

    TrayStorageService.removeSubItem(item);

    expect(TrayStorageService.getAllSubItems()).toEqual([]);
  });

  it('should save, update, and delete Menu Items', function() {

    TrayStorageService.removeMenuItem(item);

    expect(TrayStorageService.getAllMenuItems()).toEqual([]);

    TrayStorageService.saveMenuItem(item);

    expect(TrayStorageService.getAllMenuItems()).toEqual([item]);

    TrayStorageService.removeMenuItem(item);

    expect(TrayStorageService.getAllMenuItems()).toEqual([]);
  });



});
