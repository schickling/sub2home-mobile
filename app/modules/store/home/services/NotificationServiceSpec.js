'use strict';

describe('NotificationService', function() {

  beforeEach(module('app'));

  var NotificationService;
  beforeEach(inject(function(_NotificationService_) {
    NotificationService = _NotificationService_;
  }));

  it('Notification is set as default', function() {
    expect(NotificationService.getStoreHomeNotification()).toBe(true);
  });

  it('Remove Notification', function() {
    NotificationService.removeStoreHomeNotification();
    expect(NotificationService.getStoreHomeNotification()).toBe(false);
  });


  it('Remove and add Notification', function() {
    NotificationService.removeStoreHomeNotification();
    NotificationService.setStoreHomeNotification();
    expect(NotificationService.getStoreHomeNotification()).toBe(true);
  });

  it('Tray notification is not set as default', function() {
    expect(NotificationService.getTrayNotification()).toBe(null);
  });

  it('Set tray notification', function() {
    NotificationService.setTrayNotification('text');
    expect(NotificationService.getTrayNotification()).toBe('text');
  });

  it('Remove tray notification', function() {
    NotificationService.setTrayNotification('text');
    NotificationService.removeTrayNotification();
    expect(NotificationService.getTrayNotification()).toBe(null);
  });



});
