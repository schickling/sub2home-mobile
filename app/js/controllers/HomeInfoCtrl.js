'use strict';

angular.module('mobile.controllers', [])
	.controller('HomeInfoCtrl', function($scope) {
		new Imager({
			availablePixelRatios: [1, 2]
		});
	});