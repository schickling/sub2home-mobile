'use strict';

module.exports = ['_', 'ArticleIteratorService', 'ArticleModelFactory', '$route', '$q',


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

    var fetchArticle = function(article, self, artlicleList) {
      var articleModel = ArticleModelFactory.get({
        storeAlias: $route.current.params.storeAlias,
        articleId: article.id
      });

      self._hasIngrediants = true;
      self._isFetching = true;

      var defer = $q.defer();
      self._articleIterator = defer.promise;

      return articleModel.$promise.then(function() {

        self._isFetching = false;
        articleModel.allowsMenuUpgrades = 0;

        var iterator = ArticleIteratorService.init(articleModel);
        //artlicleList.savedArticle = articleModel;
        self._menuComponentCollection[self._currentArticleIndex].savedArticle = articleModel;
        defer.resolve(iterator);
        return iterator.getEntity();
      });
    };


    return {

      _menu: null,
      _menuComponentCollection: null,
      _currentArticleIndex: null,
      _articleIterator: null,
      _hasIngrediants: null,
      _currentEntity: null,
      _isFetching: null,

      init: function(menu) {
        this._menu = menu;
        this._currentArticleIndex = 0;
        this._hasIngrediants = false;
        this._articleIterator = null;
        this._menuComponentCollection = menu.menuBundleModel.menuComponentBlocksCollection;
        this._currentEntity = this._menuComponentCollection[0].menuComponentOptionsCollection[0];
        return this;
      },

      next: function() {
        var self = this;
        var defer = $q.defer();

        if (this._hasIngrediants) {
          return this._articleIterator.then(function(iterator) {
            var defer = $q.defer();
            if (iterator.hasNextEntity()) {
              var result = iterator.next();

              return result;
            } else {
              self._hasIngrediants = false;
              self._currentArticleIndex++;
              if (self._currentArticleIndex < self._menuComponentCollection.length) {
                self._currentEntity = self._menuComponentCollection[self._currentArticleIndex].menuComponentOptionsCollection[0];
              } else {
                self._currentEntity = null;
              }
              defer.resolve(self._currentEntity);

              return defer.promise;
            }
          });
        } else {
          var selectedArticle = getSelectedArticle(this._currentEntity.menuComponentOptionArticlesCollection);

          if (selectedArticle && selectedArticle.allowsIngredients) {
            if (!this._menuComponentCollection[this._currentArticleIndex].savedArticle || selectedArticle.id !== this._menuComponentCollection[this._currentArticleIndex].savedArticle.id) {
              return fetchArticle(selectedArticle, this, this._currentEntity);
            } else {
              var defer = $q.defer();
              this._articleIterator = defer.promise;

              var iterator = ArticleIteratorService.init(this._menuComponentCollection[self._currentArticleIndex].savedArticle);
              defer.resolve(iterator);
              this._hasIngrediants = true;

              return iterator.getEntity();
            }
          } else {
            this._hasIngrediants = false;
            this._currentArticleIndex++;

            if (this._currentArticleIndex < this._menuComponentCollection.length) {
              this._currentEntity = this._menuComponentCollection[this._currentArticleIndex].menuComponentOptionsCollection[0];
            } else {
              this._currentEntity = null;
            }

            defer.resolve(this._currentEntity);

            return defer.promise;
          }
        }
      },


      getNextEntity: function() {
        var defer = $q.defer();
        var self = this;

        if (this._articleIterator) {
          return this._articleIterator.then(function(iterator) {
            if (iterator.hasNextEntity()) {
              return iterator.getNextEntity();
            } else {
              var d = $q.defer();
              if (self._currentArticleIndex + 1 < self._menuComponentCollection.length) {
                var result = self._menuComponentCollection[self._currentArticleIndex + 1].menuComponentOptionsCollection[0];
                result.icon = self._menuComponentCollection[self._currentArticleIndex + 1].menuComponentBlockMediaModel.icon;
                d.resolve(result);
              } else {
                d.resolve(null);
              }
              return d.promise;
            }
          });
        } else {
          if (this._currentArticleIndex + 1 < this._menuComponentCollection.length) {
            var result = this._menuComponentCollection[this._currentArticleIndex + 1].menuComponentOptionsCollection[0];
            result.icon = this._menuComponentCollection[this._currentArticleIndex + 1].menuComponentBlockMediaModel.icon;

            defer.resolve(result);
          } else {
            defer.resolve(null);
          }
        }

        return defer.promise;
      },

      getEntity: function() {
        var defer = $q.defer();
        var self = this;

        if (this._hasIngrediants) {
          return this._articleIterator.then(function(iterator) {
            if (iterator.hasEntity()) {
              return iterator.getEntity();
            } else {
              var d = $q.defer();
              d.resolve(self._currentEntity);

              return d.promise;
            }
          });
        } else {
          defer.resolve(this._currentEntity);
        }

        return defer.promise;

      },

      getArticle: function() {
        var defer = $q.defer();

        if (this._articleIterator && this._hasIngrediants) {
          return this._articleIterator.then(function(iterator) {
            return iterator.getArticle();
          });
        } else {
          defer.resolve(this._menu.menuBundleModel);
          return defer.promise;
        }
      },

      getMenu: function() {
        return this._menu.menuBundleModel.title;
      },

      getEntityCollection: function() {
        var result = [];
        _.each(this._menuComponentCollection, function(article) {
          if (article.savedArticle) {
            var selected = {};
            selected = article.savedArticle;
            selected.menuComponentOptionsCollection = article.menuComponentOptionsCollection;
            selected.menuComponentBlockMediaModel = article.menuComponentBlockMediaModel;
            result.push(selected);
          } else {
            result.push(article);
          }
        });

        return result;
      },

      getType: function() {
        var defer = $q.defer();

        if (this._hasIngrediants) {
          //return this._articleIterator.then(function(iterator) {
            //return iterator.getEntity();
            defer.resolve('ingredient');
          //});
        } else {
          defer.resolve('Article');
        }

        return defer.promise;

      }

    };

  }
];
