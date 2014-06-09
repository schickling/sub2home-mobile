'use strict';

module.exports = function() {

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

    },

  };

};