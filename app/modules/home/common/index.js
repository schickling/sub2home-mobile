'use strict';

var StoreService = require('./services/StoreService');
var MainCtrl = require('./controllers/MainCtrl');

module.exports = angular.module('home.common', [])
  .service('StoreService', StoreService)
  .controller('HomeCommonCtrl', MainCtrl);
