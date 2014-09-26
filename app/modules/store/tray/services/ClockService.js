'use strict';

module.exports = ['_',

function(_) {

  var today = null;
  var currentTime = null;


  var dateToMinutes = function(date) {
    var result = date.getMinutes() + date.getHours() * 60;
    // round to 5 minutes
    result = result + (5 - result % 5) % 5;

  return result % 1440;
};

return {
  getCurrentTime: function() {
    return currentTime;
  },

  init: function(deliveryTimeCollection, date) {
    // build today object
    currentTime = dateToMinutes(date);


  },

};

}

];
