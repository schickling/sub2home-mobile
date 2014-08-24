'use strict';

module.exports = ['RandomService', '_', 'OrdersModelFactory', '$route',

  function(RandomService, _, OrdersModelFactory, $route) {

    return {

      order: function(dueTime, deliveryAreaModel, total, formData, singleItemsCollection, subItemsCollection, menuItemsCollection) {
        var postData = {
          comment: formData.comment || '',
          couponCode: '',
          createdAt: '',
          createdDate: '',
          creditModel: '',
          isDelivered: false,
          paymentMethod: formData.payment,
          subcardCode: '',
          tip: 0,
          total: total
        };

        postData.addressModel = this._getAddressModel(formData, deliveryAreaModel);
        postData.dueAt = new Date();
        postData.dueAt.setMinutes(dueTime % 60);
        // TODO fix before release
        postData.dueAt.setHours(Math.floor(dueTime / 60) + 2);



        postData.orderedItemsCollection = this._getOrderedItemsCollection(singleItemsCollection, subItemsCollection, menuItemsCollection);

        OrdersModelFactory.create({
          storeAlias: $route.current.params.storeAlias,
        }, postData);

      },

      _getAddressModel: function(formData, deliveryAreaModel) {
        var addressModel = {};
        addressModel.city = deliveryAreaModel.city || '';
        addressModel.postal = deliveryAreaModel.postal || '';
        addressModel.company = '';
        addressModel.district = deliveryAreaModel.district || '';
        addressModel.email = formData.email || '';
        addressModel.firstName = formData.firstName || '';
        addressModel.lastName = formData.lastName || '';
        addressModel.phone = formData.phone || '';
        addressModel.street = formData.street || '';
        addressModel.streetAdditional = formData.streetAdditional || '';
        //TODO filter streetNumber out of the street value
        addressModel.streetNumber = '';

        return addressModel;
      },

      _getOrderedItemsCollection: function(singleItemsCollection, subItemsCollection, menuItemsCollection) {
        var orderedItemsCollection = [];
        var self = this;

        _.forEach(singleItemsCollection, function(singleItem) {
          orderedItemsCollection.push(self._getSingleItemsArticle(singleItem));
        });

        _.forEach(subItemsCollection, function(subItem) {
          orderedItemsCollection.push(self._getSubItemsArticle(subItem));
        });

        _.forEach(menuItemsCollection, function(menuItem) {
          orderedItemsCollection.push(self._getMenuItemsArticle(menuItem));
        });

        return orderedItemsCollection;

      },

      _getOrderedItemObject: function() {
        var orderedItem = {};
        orderedItem.id = RandomService.getUuId();
        orderedItem.amount = 1;
        orderedItem.isInCart = true;
        return orderedItem;
      },

      _getSingleItemsArticle: function(singleItem) {
        var orderedItem = this._getOrderedItemObject();

        orderedItem.total = singleItem.finalPrice;
        orderedItem.menuBundleModel = null;

        var orderedArticle = {
          menuBundleModel: null,
          menuComponentBlockModel: null,
          menuUpgradeModel: null
        };

        orderedArticle.articleModel = singleItem;
        orderedArticle.articleModel.ingredientCategoriesCollection = null;

        orderedItem.orderedArticlesCollection = [orderedArticle];

        return orderedItem;
      },

      _getSubItemsArticle: function(subItem) {
        var orderedItem = this._getOrderedItemObject();

        orderedItem.total = subItem.finalPrice;
        orderedItem.menuBundleModel = null;

        var orderedArticle = {
          menuBundleModel: null,
          menuCompomponentBlockModel: null,
          menuUpgradeModel: null
        };

        orderedArticle.articleModel = subItem;

        orderedItem.orderedArticlesCollection = [orderedArticle];

        return orderedItem;
      },


    _getMenuItemsArticle: function(menuItem) {
        var orderedItem = this._getOrderedItemObject();

        orderedItem.total = menuItem.finalPrice;
        if (menuItem.menuBundleModel.id) {
          orderedItem.menuBundleModel = menuItem.menuBundleModel;
        } else {
          orderedItem.menuBundleModel = null;
        }

        orderedItem.orderedArticlesCollection = [];


        _.forEach(menuItem.articlesCollection, function(article) {
          var orderedArticle = {};
          orderedArticle.articleModel = article.savedArticle;
          if (!orderedArticle.articleModel.ingredientCategoriesCollection) {
            orderedArticle.articleModel.ingredientCategoriesCollection = null;
          }


          orderedArticle.menuCompomponentBlockModel = {
            id: RandomService.getUuId(),
            menuComponentBlockMediaModel: article.menuComponentBlockMediaModel,
            menuComponentOptionsCollection: article.menuComponentOptionsCollection,

          };

          if (article.savedArticle.menuUpgrade) {
            orderedArticle.menuUpgradeModel = article.savedArticle.menuUpgrade;
          } else {
            orderedArticle.menuUpgradeModel = null;
            orderedArticle.menuBundleModel = menuItem.menuBundleModel;
          }
          orderedItem.orderedArticlesCollection.push(orderedArticle);
        });


        return orderedItem;
      },
    };

  }

];
