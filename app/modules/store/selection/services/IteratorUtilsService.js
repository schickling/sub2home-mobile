'use strict';

module.exports = ['_',

  function(_) {

    return {
      getSelectedArticle: function(entity) {
        return _.find(entity, e => e.isSelected) || null;
      }

    };
  }
];
