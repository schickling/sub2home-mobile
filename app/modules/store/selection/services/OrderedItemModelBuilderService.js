'use strict';

module.exports = ['_',

  function(_) {

    return {

      buildWithArticle: function(articleModel) {

        var orderedItemModel = {
          orderedArticlesCollection: []
        };

        var orderedArticleModel = {
          articleModel
        };

        orderedItemModel.orderedArticlesCollection.push(orderedArticleModel);

        return orderedItemModel;

      },

      buildWithMenuBundle: function(menuBundleModel) {
        var orderedItemModel = {
          orderedArticlesCollection: [],
          menuBundleModel: menuBundleModel
        };

        _.each(menuBundleModel.menuComponentBlocksCollection, function(article) {
          orderedItemModel.orderedArticlesCollection.push(article);
        });

        return orderedItemModel;
      },

    };

  }
];
