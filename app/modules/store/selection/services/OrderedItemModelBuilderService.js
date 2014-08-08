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

        //        _.each(menuBundleModel.menuComponentBlocksCollection, function(article) {
        //          _.each(article.menuComponentOptionsCollection[0].menuComponentOptionArticlesCollection, function(articleOption) {
        //           articleOption.allowsMenuUpgrades = 0;
        //          });
        //        });

        var orderedItemModel = {
          articlesCollection: menuBundleModel.menuComponentBlocksCollection,
          menuBundleModel: menuBundleModel
        };



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
