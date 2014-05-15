'use strict';

var ApiService = require('./services/ApiService');
var ResourceService = require('./services/ResourceService');
var CategoriesFactory = require('./services/CategoriesFactory');
var StoresFactory = require('./services/StoresFactory');

module.exports = angular.module('resources', [])
  .service('ApiService', ApiService)
  .service('ResourceService', ResourceService)
  .factory('CategoriesFactory', CategoriesFactory)
  .factory('StoresFactory', StoresFactory);