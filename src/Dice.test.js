/*
  Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

  This file is part of @revtts/Dice.

  @revtts/Dice is free software: you can redistribute it and/or modify it under the terms of
  the GNU General Public License as published by the Free Software Foundation, either
  version 3 of the License, or any later version.

  @revtts/Dice is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
  PURPOSE. See the GNU General Public License for more details.

  You should have received a copy of the GNU General Public License along with @revtts/Dice.
  If not, see <https://www.gnu.org/licenses/>. 
*/

import assert from 'assert';

import { Dice } from './Dice.js';

describe('Dice given prng: () => 0.1', () => {
  const prng = () => .01;

  describe('roll', () => {
    describe('algebra', () => {
      describe('addition', () => {
        it('basic: returns 3 given "1+2"',() => {
          const input = '1+2';
          const expected_output = 3;
    
          const dice = new Dice();
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
  
      describe('division', () => {
        it('basic: returns 2.5 given "5/2"', () => {
          const input = '5/2';
          const expected_output = 2.5;
    
          const dice = new Dice();
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
  
      describe('exponents', () => {
        it('basic: returns 125 given "5**3"', () => {
          const input = '5**3';
          const expected_output = 125;
    
          const dice = new Dice();
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
  
      describe('modulus', () => {
        it('basic: returns 3 given "8%5"', () => {
          const input = '8%5';
          const expected_output = 3;
    
          const dice = new Dice();
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
  
      describe('multiplication', () => {
        it('basic: returns 10 given "2*5"', () => {
          const input = '2*5';
          const expected_output = 10;
    
          const dice = new Dice();
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
  
      describe('subtraction', () => {
        it('basic: returns 1 given "2-1"', () => {
          const input = '2-1';
          const expected_output = 1;
    
          const dice = new Dice();
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
    });

    describe('die', () => {
      describe('single die', () => {
        it('basic: returns 1 given "1d10"', () => {
          const input = '1d10';
          const expected_output = 1;
    
          const dice = new Dice(prng);
    
          assert.equal(dice.roll(input), expected_output);
        });
  
        it('difference die size: returns 2 given "1d100"', () => {
          const input = '1d100';
          const expected_output = 2;
    
          const dice = new Dice(prng);
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
  
      describe('roll multiple dice', () => {
        it('basic: returns 10 given "10d10"', () => {
          const input = '10d10';
          const expected_output = 10;
    
          const dice = new Dice(prng);
    
          assert.equal(dice.roll(input), expected_output);
        });
  
        it('with addition: returns 6 given "3d5+3"', () => {
          const input = '3d5+3';
          const expected_output = 6;
    
          const dice = new Dice(prng);
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
    });

    describe('numbers', () => {
      describe('whole numbers', () => {
        it('basic: returns 10 given "10"', () => {
          const input = '10';
          const expected_output = 10;
      
          const dice = new Dice();
      
          assert.equal(dice.roll(input), expected_output);
        })
      });
    
      describe('negative integers', () => {
        it('basic: returns -10 given "-10"', () => {
          const input = '-10';
          const expected_output = -10;
      
          const dice = new Dice();
      
          assert.equal(dice.roll(input), expected_output);
        });
      });
    
      describe('real numbers', () => {
        it('basic: returns 3.5 given "3.5"', () => {
          const input = '3.5';
          const expected_output = 3.5;
      
          const dice = new Dice();
      
          assert.equal(dice.roll(input), expected_output);
        });
      });
    });

    describe('functions', () => {
      describe('abs', () => {
        it('basic: returns 4 given "abs(10-14)"', () => {
          const input = 'abs(10-14)';
          const expected_output = 4;
      
          const dice = new Dice();
      
          assert.equal(dice.roll(input), expected_output);
        });
      });

      describe('ceil', () => {
        it('basic: returns 4 given "ceil(10/3)"', () => {
          const input = 'ceil(10/3)';
          const expected_output = 4;
      
          const dice = new Dice();
      
          assert.equal(dice.roll(input), expected_output);
        });
      });

      describe('floor', () => {
        it('basic: returns 3 given "floor(10/3)"', () => {
          const input = 'floor(10/3)';
          const expected_output = 3;
      
          const dice = new Dice();
      
          assert.equal(dice.roll(input), expected_output);
        });
      });

      describe('round', () => {
        it('rounds up: returns 4 given "round(11/3)"', () => {
          const input = 'round(11/3)';
          const expected_output = 4;
    
          const dice = new Dice();
    
          assert.equal(dice.roll(input), expected_output);
        });
    
        it('rounds down: returns 3 given "round(10/3)"', () => {
          const input = 'round(10/3)';
          const expected_output = 3;
    
          const dice = new Dice();
    
          assert.equal(dice.roll(input), expected_output);
        });
      });
    });

    describe('parenthesis', () => {
      it('basic: returns 2 given "4/(3-1)"', () => {
        const input = '4/(3-1)';
        const expected_output = 2;
    
        const dice = new Dice();
    
        assert.equal(dice.roll(input), expected_output);
      });
    });

    describe('whitespace', () => {
      it('is skipped', () => {
        const input = '3 . 5';
        const expected_output = 3.5;
    
        const dice = new Dice();
    
        assert.equal(dice.roll(input), expected_output);
      })
    });
  });
});