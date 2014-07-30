'use strict';

var compassDirective = require('./directives/compassDirective');
var StringUtilService = require('./services/StringUtilService');
var PostalOracleService = require('./services/PostalOracleService');
var PersistenceService = require('./services/PersistenceService');
var RoutingService = require('./services/RoutingService');

module.exports = angular.module('common', [])
  .directive('compass', compassDirective)
  .service('StringUtilService', StringUtilService)
  .service('PostalOracleService', PostalOracleService)
  .service('PersistenceService', PersistenceService)
  .service('RoutingService', RoutingService);
