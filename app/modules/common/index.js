'use strict';

var StringUtilService = require('./services/StringUtilService');
var ApiService = require('./services/ApiService');

module.exports = angular.module('common', [])
  .service('StringUtilService', StringUtilService)
  .service('ApiService', ApiService);