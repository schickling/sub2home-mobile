'use strict';

module.exports = ['TrayStorageService',

  function(TrayStorageService) {

    return {
      getTotalAmount: function() {
        var allItems = TrayStorageService.getAllItems();
        return allItems.reduce(function(sum, model) {
          sum = sum + model.deposit;
          return sum + model.finalPrice;
        }, 0);
      }

    };

  }

];
