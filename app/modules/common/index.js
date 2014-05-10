'use strict';

var StringUtilService = require('./services/StringUtilService');
var ResourcesService = require('./services/ResourcesService');
var PostalOracleService = require('./services/PostalOracleService');
var ApiService = require('./services/ApiService');
var PersistenceService = require('./services/PersistenceService');

module.exports = angular.module('common', [])
  .service('StringUtilService', StringUtilService)
  .service('ResourcesService', ResourcesService)
  .service('PostalOracleService', PostalOracleService)
  .service('ApiService', ApiService)
  .service('PersistenceService', PersistenceService);