'use strict';

module.exports = ['PersistenceService', '_', 'RandomService',

  function(PersistenceService, _, RandomService) {

    return {
      saveItem: function(itemKey, item) {
        // Add unique id to the item
        item.uuid = RandomService.getUuId();

        var all = PersistenceService.load(itemKey);
        if (all) {
          all.push(item);
        } else {
          all = [item];
        }

        PersistenceService.save(itemKey, all);
      },

      getAllItems: function(itemKey) {
        var all = PersistenceService.load(itemKey);
        if (all) {
          return all;
        } else {
          return [];
        }
      },

      removeItem: function(itemKey, item) {
        var all = PersistenceService.load(itemKey);

        if (all) {
          PersistenceService.save(itemKey, _.without(all, _.findWhere(all, {
            uuid: item.uuid
          })));
        }
      }

    };
  }

];
