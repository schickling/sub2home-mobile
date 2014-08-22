'use strict';

require('./home');
require('./info');

module.exports = angular.module('home', [
  // TODO uncomment after launch
  //'home.home',
  'home.info',
]);
