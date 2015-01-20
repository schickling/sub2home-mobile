'use strict';

describe('IteratorUtilsService', function() {

  beforeEach(module('app'));

  var IteratorUtilsService;
  beforeEach(inject(function(_IteratorUtilsService_) {
    IteratorUtilsService = _IteratorUtilsService_;
  }));

  describe('getSelectedArticle', function() {
    it('no Parameter', function() {
      var selected = IteratorUtilsService.getSelectedArticle();
      expect(selected).toBe(null);
    });

    it('null as parameter', function() {
      var selected = IteratorUtilsService.getSelectedArticle(null);
      expect(selected).toBe(null);
    });

    it('Array of Aricles with one selected', function() {
      var articles = [{
        id: 0
      }, {
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }, {
        id: 4
      }, {
        id: 5
      }, {
        id: 6,
        isSelected: true
      }, {
        id: 7
      }];

      var selected = IteratorUtilsService.getSelectedArticle(articles);
      expect(selected).toBe(articles[6]);
    });

    it('Array of Aricles with none selected', function() {
      var articles = [{
        id: 0
      }, {
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }, {
        id: 4
      }, {
        id: 5
      }, {
        id: 6,
      }, {
        id: 7
      }];

      var selected = IteratorUtilsService.getSelectedArticle(articles);
      expect(selected).toBe(null);
    });
  });





});
