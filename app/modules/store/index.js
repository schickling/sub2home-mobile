'use strict';

require('./home');
require('./info');
require('./selection');
require('./tray');
require('./checkout');

module.exports = angular.module('store', [
  'store.info',
  'store.selection',
  'store.tray',
  'store.checkout',
  'store.home', // needs to be last for dynamic url interpolation
]);