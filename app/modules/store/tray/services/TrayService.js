'use strict';

module.exports = ['TrayStorageService',

  function(TrayStorageService) {

    return {
      getTotalAmount: function() {
        var allItems = TrayStorageService.getAllItems();
        return allItems.reduce(function(sum, model) {
          return sum + model.finalPrice;
        }, 0);
      }

    };

  }

];
