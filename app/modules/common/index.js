'use strict';

var StringUtilService = require('./services/StringUtilService');
var ResourcesService = require('./services/ResourcesService');
var ApiService = require('./services/ApiService');

module.exports = angular.module('common', [])
  .service('StringUtilService', StringUtilService)
  .service('ResourcesService', ResourcesService)
  .service('ApiService', ApiService);