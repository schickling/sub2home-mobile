'use strict';

describe('LastPageService', function() {

  beforeEach(module('app'));

  var LastPageService;
  beforeEach(inject(function(_LastPageService_) {
    LastPageService = _LastPageService_;
  }));

  it('should save and return and delete the last page', function() {

    var path = '/memmingen/1';
    var title = 'Subs';

    LastPageService.set(path, title);

    expect(LastPageService.get()).toEqual({
      path: path,
      title: title
    });

  });

});
