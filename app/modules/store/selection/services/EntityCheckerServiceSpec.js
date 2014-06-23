'use strict';

describe('EntityCheckerService', function() {

  beforeEach(module('app'));

  var EntityCheckerService;
  beforeEach(inject(function(_EntityCheckerService_) {
    EntityCheckerService = _EntityCheckerService_;
  }));

  describe('check ingredients', function() {

    it('should succeed for non mandatory ingredient category', function() {

      var ingredientCategory = {
        isMandatory: false,
        ingredientsCollection: [{
          id: 1,
          isSelected: false
        }]
      };

      var isCompled = EntityCheckerService.isCompled(ingredientCategory);

      expect(isCompled).toBe(true);

    });

    it('should succeed for mandatory ingredient category', function() {

      var ingredientCategory = {
        isMandatory: true,
        ingredientsCollection: [{
          id: 1,
          isSelected: false
        }, {
          id: 2,
          isSelected: true
        }]
      };

      var isCompled = EntityCheckerService.isCompled(ingredientCategory);

      expect(isCompled).toBe(true);

    });

    it('should fail for mandatory ingredient category', function() {

      var ingredientCategory = {
        isMandatory: true,
        ingredientsCollection: [{
          id: 1,
          isSelected: false
        }, {
          id: 2,
          isSelected: false
        }]
      };

      var isCompled = EntityCheckerService.isCompled(ingredientCategory);

      expect(isCompled).toBe(false);

    });

  });

});
