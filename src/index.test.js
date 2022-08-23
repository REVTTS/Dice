import assert from 'assert';

import Dice from './index.js';

describe('Dice', () => {
  describe('roll', () => {
    it('Basic: 1d20', () => {
      const input = '1d20';
      const expected_output = []

      const dice = new Dice(input);
      console.log(dice);
    });

  });
});