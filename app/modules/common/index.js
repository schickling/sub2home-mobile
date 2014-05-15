'use strict';

var StringUtilService = require('./services/StringUtilService');
var PostalOracleService = require('./services/PostalOracleService');
var PersistenceService = require('./services/PersistenceService');

module.exports = angular.module('common', [])
  .service('StringUtilService', StringUtilService)
  .service('PostalOracleService', PostalOracleService)
  .service('PersistenceService', PersistenceService);