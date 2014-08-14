'use strict';

module.exports = function() {

  return {

    padNumber: function(number, length) {
      number = number + '';
      if (number.length >= length) {
        return number;
      } else {
        return new Array(length - number.length + 1).join('0') + number;
      }
    }

  };

};
