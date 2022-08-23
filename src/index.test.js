import assert from 'assert';

import Dice from './index.js';

describe('Dice', () => {
  describe('roll', () => {
    it('Basic: 1d1', () => {
      const input = '10d10';
      const expected_output = 20;

      const dice = new Dice(input, () => 0.1);

      assert.equal(dice.roll(), expected_output);
    });

  });
});