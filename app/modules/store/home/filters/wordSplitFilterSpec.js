'use strict';

describe('wordSplitFilter', function() {

  beforeEach(module('app'));

  var wordSplitFilter;
  beforeEach(inject(function (_wordSplitFilter_) {
    wordSplitFilter = _wordSplitFilter_;
  }));

  it('should return all but the last word', function() {

    var sentence = 'This are some words';

    expect(wordSplitFilter(sentence, true)).toBe('This are some');

  });

  it('should return the last word', function() {

    var sentence = 'This are some words';

    expect(wordSplitFilter(sentence, false)).toBe('words');

  });

});
