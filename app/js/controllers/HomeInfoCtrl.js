'use strict';

angular.module('mobile.controllers', []).controller('HomeInfoCtrl',
	function() {
		new window.Imager({
			availablePixelRatios: [1, 2]
		});
	});