'use strict';

module.exports = [ '_', 'ArticleIteratorService', 'ArticleModelFactory', '$route', '$q',


  function(_, ArticleIteratorService, ArticleModelFactory, $route, $q) {

    var getSelectedArticle = function(entity) {
      var result = null;

      if (entity instanceof Array) {
        _.each(entity, function(option) {
          if (option.isSelected) {
            result = option;
          }
        });
      }

      return result;
    };

    var fetchArticle =  function(article) {
        var articleModel = ArticleModelFactory.get({
          storeAlias: $route.current.params.storeAlias,
          articleId: article.id
        });

        return articleModel.$promise.then(function() {
          return ArticleIteratorService.init(articleModel);
        });
    };


    return {

      _menu: null,
      _menuComponentCollection: null,
      _currentArticleIndex: null,
      _articleIterator: null,

      init: function(menu) {
        this._menu = menu;
        this._currentArticleIndex = 0;
        this._menuComponentCollection = menu.menuBundleModel.menuComponentBlocksCollection;

       return this;
      },

      next: function() {
        var nextEntity = this.getNextEntity();

        if (nextEntity) {
          this._currentArticleIndex++;
        }
        return nextEntity;
      },

      
      getNextEntity: function() {

        var defer = $q.defer();

        if (!this._articleIterator) {

          var article = getSelectedArticle(this.getEntity());


          if (article && article.allowsIngredients) {
            // fetch from server


            // defer.promise = this.fetchArtile(article);
            //this._articleIterator = fetchArticle(article);
            var self = this;
            fetchArticle(article).then(function(iterator) {
              self._articleIterator = iterator;
              return iterator.getEntity();
            });

          } else {

            if (this._currentArticleIndex + 1 < this._menuComponentCollection.length) {
              var entity = this._menuComponentCollection[this._currentArticleIndex + 1];
              defer.resolve(entity.menuComponentOptionsCollection[0]);
              return defer.promise;
            }
          }
        } else {
          defer.resolve(this._articleIterator.getNextEntity());
          // TODO when getNextEntity is Null
        }

      },

      getEntity: function() {
        var defer = $q.defer();

        var entity = this._menuComponentCollection[this._currentArticleIndex];

          if (!this._articleIterator) {
            // if getSelected annd has ingrediants fetch from server
            defer.resolve(entity.menuComponentOptionsCollection[0].menuComponentOptionArticlesCollection);

            //this._articleIterator = ArticleIteratorService.init();
            //result = this._articleIterator();
          } else {
            defer.resolve(this._articleIterator);
          }

        return defer.promise;
      },

      getArticle: function() {
        return this._menu.menuBundleModel;
      },

      jumpToEntity: function(entity) {

      },

      getType: function() {
        return 'Article';
      }
    };

  }
];
