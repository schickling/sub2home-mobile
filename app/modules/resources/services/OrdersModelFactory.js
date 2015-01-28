'use strict';

module.exports = ['ResourceService',
  function(ResourceService) {
    return function(success, error) {

      var actions = {
        create: {
          method: 'POST',
          interceptor: {
            responseError: error,
            response: success
          }
        }
      };

      return ResourceService.create('stores/:storeAlias/orders', {},
        actions);
    };
  }
];
