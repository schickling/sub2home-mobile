'use strict';

describe('LastPageService', function() {

  beforeEach(module('app'));

  var LastPageService;
  beforeEach(inject(function(_LastPageService_) {
    LastPageService = _LastPageService_;
  }));

  it('should save and return and delete the last page', function() {

    var title = 'Subs'

    LastPageService.set(title);

    expect(LastPageService.get()).toEqual(title);

  });

});
