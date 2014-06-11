'use strict';

module.exports = [

  function() {
    return function(sentence, takeFirstPart) {

      var words = sentence.split(' ');

      var wordsToTake = takeFirstPart ? words.slice(0, -1) : words.slice(-1);

      return wordsToTake.join(' ');

    };
  }

];
