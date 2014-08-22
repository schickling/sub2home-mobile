'use strict';

require('./home');
require('./info');

module.exports = angular.module('home', [
  'home.home',
  'home.info',
]);
