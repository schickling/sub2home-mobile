'use strict';

module.exports = ['ResourceService',
  function(ResourceService) {

    return ResourceService.create('stores/:storeAlias/categories');

  }
];