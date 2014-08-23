'use strict';

var ApiService = require('./services/ApiService');
var ResourceService = require('./services/ResourceService');
var CategoryModelFactory = require('./services/CategoryModelFactory');
var ArticleModelFactory = require('./services/ArticleModelFactory');
var MenuBundleModelFactory = require('./services/MenuBundleModelFactory');
var OrdersModelFactory = require('./services/OrdersModelFactory');
var StoreModelFactory = require('./services/StoreModelFactory');

module.exports = angular.module('resources', [])
  .service('ApiService', ApiService)
  .service('ResourceService', ResourceService)
  .factory('CategoryModelFactory', CategoryModelFactory)
  .factory('ArticleModelFactory', ArticleModelFactory)
  .factory('MenuBundleModelFactory', MenuBundleModelFactory)
  .factory('OrdersModelFactory', OrdersModelFactory)
  .factory('StoreModelFactory', StoreModelFactory);
