'use strict';

describe('RoutingService', function() {

  beforeEach(module('app'));

  var RoutingService, $location, $rootScope, $routeParams;
  beforeEach(inject(function(_RoutingService_, _$location_, _$rootScope_, _$routeParams_) {
    RoutingService = _RoutingService_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $routeParams = _$routeParams_;
  }));

  describe('navigate', function() {

    beforeEach(function() {
      $location.path('/old/path');
      expect($location.path()).toBe('/old/path');
    });

    it('should work with a simple path', function() {

      RoutingService.navigate('/new/path/called');
      expect($location.path()).toBe('/new/path/called');

    });

    it('should interpolate :storeAlias', function() {

      $routeParams.storeAlias = 'memmingen';

      RoutingService.navigate(':storeAlias/some/route');
      expect($location.path()).toBe('/memmingen/some/route');

    });

  });

});