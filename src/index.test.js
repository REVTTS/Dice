import assert from 'assert';

import Dice from './index.js';

describe('Dice', () => {
  describe('roll', () => {
    it('does a regular die', () => {
      const input = '1d10';
      const expected_output = 2;

      const dice = new Dice(() => 0.1);

      assert.equal(dice.roll(input), expected_output);
    });

    it('rolls multiple die', () => {
      const input = '10d10';
      const expected_output = 20;

      const dice = new Dice(() => 0.1);

      assert.equal(dice.roll(input), expected_output);
    });

    it('rolls difference size die', () => {
      const input = '1d100';
      const expected_output = 11;

      const dice = new Dice(() => 0.1);

      assert.equal(dice.roll(input), expected_output);
    });

    it('adds numbers', () => {
      const input = '1+2';
      const expected_output = 3;

      const dice = new Dice();

      assert.equal(dice.roll(input), expected_output);
    });

    it('subtracts numbers', () => {
      const input = '2-1';
      const expected_output = 1;

      const dice = new Dice();

      assert.equal(dice.roll(input), expected_output);
    });

    it('multiplies numbers', () => {
      const input = '2*5';
      const expected_output = 10;

      const dice = new Dice();

      assert.equal(dice.roll(input), expected_output);
    });

    it('divides numbers', () => {
      const input = '5/2';
      const expected_output = 2.5;

      const dice = new Dice();

      assert.equal(dice.roll(input), expected_output);
    });

    it('rolls and adds', () => {
      const input = '3d5+3';
      const expected_output = 18;

      const dice = new Dice(() => .9999);

      assert.equal(dice.roll(input), expected_output);
    });

    it('modulus numbers', () => {
      const input = '8%5';
      const expected_output = 3;

      const dice = new Dice();

      assert.equal(dice.roll(input), expected_output);
    });

    it('has exponents', () => {
      const input = '5**3';
      const expected_output = 125;

      const dice = new Dice();

      assert.equal(dice.roll(input), expected_output);
    });

    it('floors a value', () => {
      const input = 'floor(10/3)';
      const expected_output = 3;

      const dice = new Dice();

      assert.equal(dice.roll(input), expected_output);
    });

    it('ceils a value', () => {
      const input = 'ceil(10/3)';
      const expected_output = 4;
  
      const dice = new Dice();
  
      assert.equal(dice.roll(input), expected_output);
    });
  
    it('absolutes a value', () => {
      const input = 'abs(10-14)';
      const expected_output = 4;
  
      const dice = new Dice();
  
      assert.equal(dice.roll(input), expected_output);
    });

    describe('rounds a value', () => {
      it('rounds up', () => {
        const input = 'round(11/3)';
        const expected_output = 4;
  
        const dice = new Dice();
  
        assert.equal(dice.roll(input), expected_output);
      });

      it('rounds down', () => {
        const input = 'round(12/5)';
        const expected_output = 2;
  
        const dice = new Dice();
  
        assert.equal(dice.roll(input), expected_output);
      });
    });
  
    it('respects parenthesis', () => {
      const input = '4/(3-1)';
      const expected_output = 2;
  
      const dice = new Dice();
  
      assert.equal(dice.roll(input), expected_output);
    });
  });
});