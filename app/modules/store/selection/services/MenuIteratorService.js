'use strict';

module.exports = [ '_', 'ArticleIteratorService',

  function(_, ArticleIteratorService) {

    return {

      _menu: null,
      _articleIterators: null,

//      _menuUpgradeIndex: null,
//      _menuUpgradeArticleIndex: null,

      init: function(menu) {
        this._articleIterators = [];

        _.each(menu.orderedArticlesCollection, function(article) {
          _articleIterators.push(ArticleIteratorService.init(article));
        });
       return this;
      },

      next: function() {
        return null;
      },

      getNextEntity: function() {
        return null;
      },

      getEntity: function() {
        return null;
      },

      getArticle: function() {

      },

      jumpToEntity: function(entity) {

      },

      getType: function() {
        return 'menu';
      }
    };

  }
];
