import assert from 'assert';

import dice from './dice.js';

describe('dice', () => {
  describe('lex', () => {
    it('Basic: 1d20', () => {
      const input = '1d20';
      const expected_output = []
  
      const output = dice.lex(input);
      console.log(output);
  
      assert.equal(output, expected_output);
    });

  });
});