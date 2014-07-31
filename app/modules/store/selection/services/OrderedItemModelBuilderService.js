'use strict';

module.exports = ['_',

  function(_) {

    return {

      buildWithArticle: function(articleModel) {

        var orderedItemModel = {
          articlesCollection: [articleModel]
        };

        return orderedItemModel;

      },

      buildWithMenuBundle: function(menuBundleModel) {
        var orderedItemModel = {
          articlesCollection: [],
          menuBundleModel: menuBundleModel
        };

        _.each(menuBundleModel.menuComponentBlocksCollection, function(article) {
          orderedItemModel.articlesCollection.push(article);
        });

        return orderedItemModel;

      },

      _seperateDefaultIngredients: function(articleModel) {

        _.each(articleModel.ingredientCategoriesCollection, function(ingredientCategoryModel) {

          var group = _.groupBy(ingredientCategoryModel.ingredientsCollection, 'isDefault');

          ingredientCategoryModel.ingredientsCollection = group[0];
          ingredientCategoryModel.defaultIngredientModel = group.hasOwnProperty(1) ? group[1][0] : null;

        });


      },

    };

  }
];
