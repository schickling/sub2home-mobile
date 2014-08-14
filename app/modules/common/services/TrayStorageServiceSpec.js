'use strict';

describe('TrayService', function() {

  beforeEach(module('app'));

  var TrayService;
  beforeEach(inject(function(_TrayService_) {
    TrayService = _TrayService_;
  }));

  it('should save, update, and delete single Items', function() {

    TrayService.removeSingleItem(item);

    expect(TrayService.getAllSingeItems()).toEqual([]);

    TrayService.saveSingeItem(item);

    expect(TrayService.getAllSingeItems()).toEqual([item]);

    TrayService.removeSingleItem(item);

    expect(TrayService.getAllSingeItems()).toEqual([]);
  });

  it('should save, update, and delete Sub Items', function() {

    TrayService.removeSubItem(item);

    expect(TrayService.getAllSubItems()).toEqual([]);

    TrayService.saveSubItem(item);

    expect(TrayService.getAllSubItems()).toEqual([item]);

    TrayService.removeSubItem(item);

    expect(TrayService.getAllSubItems()).toEqual([]);
  });

  it('should save, update, and delete Menu Items', function() {

    TrayService.removeMenuItem(item);

    expect(TrayService.getAllMenuItems()).toEqual([]);

    TrayService.saveMenuItem(item);

    expect(TrayService.getAllMenuItems()).toEqual([item]);

    TrayService.removeMenuItem(item);

    expect(TrayService.getAllMenuItems()).toEqual([]);
  });



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
});
