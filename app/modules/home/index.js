'use strict';

require('./home');
require('./info');
require('./common');


module.exports = angular.module('home', [
  'home.home',
  'home.info',
  'home.common',
]);
