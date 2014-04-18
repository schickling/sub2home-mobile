'use strict';

module.exports = function() {

  return {

    padNumber: function(number, length) {
      number = number + '';
      return number.length >= length ? number : new Array(length - number.length + 1).join('0') + number;
    }

  };

};