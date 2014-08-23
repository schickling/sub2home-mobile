'use strict';

module.exports = ['RandomService', '_', 'OrdersModelFactory', '$route',

  function(RandomService, _, OrdersModelFactory, $route) {

    return {

      order: function(total, formData, singleItemsCollection, subItemsCollection, menuItemsCollection) {
        var postData = {
          comment: formData.comment,
          couponCode: null,
          createdAt: null,
          createdDate: null,
          creditModel: null,
          isDelivered: false,
          paymentMethod: formData.payment,
          subcardCode: '',
          tip: 0,
          total: total
        };

        // TODO dueAT and dueDate ask Johannes about the difference
        postData.dueAt = new Date();
        postData.dueDate = new Date();

        postData.orderedItemsCollection = this._getOrderedItemsCollection(singleItemsCollection, subItemsCollection, menuItemsCollection);

        OrdersModelFactory.create({
          storeAlias: $route.current.params.storeAlias,
        }, postData);

        console.log('Sent order');

      },

      _getAddressModel: function(formData) {
        var addressModel = {};
        addressModel.city = '';
        addressModel.company = '';
        addressModel.district = '';
        addressModel.email = formData.email;
        addressModel.firstName = formData.firstName;
        addressModel.lastName = formData.lastName;
        addressModel.phone = formData.phone;
        addressModel.street = formData.street;
        addressModel.streetAdditional = formData.streetAdditional;
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
          menuCompomponentBlockModel: null,
          menuUpgradeModel: null
        };

        orderedArticle.articleModel = singleItem;

        orderedItem.orderedArticlesCollection = [orderedArticle];

        return orderedItem;
      },

    };

  }

];
