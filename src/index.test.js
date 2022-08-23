import assert from 'assert';

import Dice from './index.js';

describe('Dice', () => {
  describe('roll', () => {
    it('does a regular die', () => {
      const input = '1d10';
      const expected_output = 2;

      const dice = new Dice(input, () => 0.1);

      assert.equal(dice.roll(), expected_output);
    });

    it('rolls multiple die', () => {
      const input = '10d10';
      const expected_output = 20;

      const dice = new Dice(input, () => 0.1);

      assert.equal(dice.roll(), expected_output);
    });

    it('rolls difference size die', () => {
      const input = '1d100';
      const expected_output = 11;

      const dice = new Dice(input, () => 0.1);

      assert.equal(dice.roll(), expected_output);
    });

    it('adds numbers', () => {
      const input = '1+2';
      const expected_output = 3;

      const dice = new Dice(input);

      assert.equal(dice.roll(), expected_output);
    });

    it('subtracts numbers', () => {
      const input = '2-1';
      const expected_output = 1;

      const dice = new Dice(input);

      assert.equal(dice.roll(), expected_output);
    });

    it('multiplies numbers', () => {
      const input = '2*5';
      const expected_output = 10;

      const dice = new Dice(input);

      assert.equal(dice.roll(), expected_output);
    });

    it('divides numbers', () => {
      const input = '5/2';
      const expected_output = 2.5;

      const dice = new Dice(input);

      assert.equal(dice.roll(), expected_output);
    });

  });
});