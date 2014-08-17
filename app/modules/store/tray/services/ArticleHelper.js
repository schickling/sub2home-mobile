'use strict';

module.exports = ['_',

  function(_) {

    return {
      getSelectedArticle: function(article) {
        var result = null;
        _.forEach(article.menuComponentOptionsCollection, function(optionCollection) {
          _.forEach(optionCollection.menuComponentOptionArticlesCollection, function(item) {
            if (item.isSelected) {
              result = item;
            }
          });
        });

        return result;
      },

      getAllSelectedIngrediants: function(article) {
        var result = [];

        if (article.allowsIngredients) {
          _.forEach(article.ingredientCategoriesCollection, function(ingrediantCategory) {
            _.forEach(ingrediantCategory.ingredientsCollection, function(ingredient) {
              if (ingredient.isSelected) {
                result.push(ingredient);
              }
            });
          });
        }

        return result;

      },

      articleToString: function(article) {
        var result = article.info + ' mit ';

        var ingredients = this.getAllSelectedIngrediants(article);

        _.forEach(ingredients, function(ingrediant) {
          result = result + ingrediant.title + ', ';
        });

        if (result.slice(-2) === ', ') {
          result = result.substring(0, result.length - 2);
        }

        return result;
      }

    };

  }

];
