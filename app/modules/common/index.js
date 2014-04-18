'use strict';

var StringUtilService = require('./services/StringUtilService');

module.exports = angular.module('common', [])
  .service('StringUtilService', StringUtilService);