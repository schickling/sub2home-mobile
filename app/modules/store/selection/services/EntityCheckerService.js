'use strict';

module.exports = [

  function() {

    return {

      isCompled: function(entity) {

        if (entity.isMandatory) {

          var ingredientsCollection = entity.ingredientsCollection;
          var numberOfSelectedIngredients = ingredientsCollection.reduce(function(a, i) {
            return a + i.isSelected;
          }, 0);

          if (numberOfSelectedIngredients === 0) {
            return false;
          }

        }

        return true;

      },

    };

  }
];

