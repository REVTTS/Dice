/*
  Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

  This file is part of REVTTS Dice.

  REVTTS Dice is free software: you can redistribute it and/or modify it under the terms of
  the GNU General Public License as published by the Free Software Foundation, either
  version 3 of the License, or any later version.

  REVTTS Dice is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
  PURPOSE. See the GNU General Public License for more details.

  You should have received a copy of the GNU General Public License along with REVTTS Dice.
  If not, see <https://www.gnu.org/licenses/>. 
*/

import { CstParser } from 'chevrotain';

import {
  token_bracket_round_close,
  token_bracket_round_open
} from './tokens/brackets.js';

import {
  token_operator_absolute,
  token_operator_ceil,
  token_operator_dice,
  token_operator_divide,
  token_operator_dot,
  token_operator_exponent,
  token_operator_floor,
  token_operator_minus,
  token_operator_modulus,
  token_operator_multiply,
  token_operator_plus,
  token_operator_round,
} from './tokens/operators.js';

import {
  token_number_zero,
  token_number_one,
  token_number_two,
  token_number_three,
  token_number_four,
  token_number_five,
  token_number_six,
  token_number_seven,
  token_number_eight,
  token_number_nine,
} from './tokens/numbers.js';

export class Parser extends CstParser {
  constructor(tokens) {
    super(tokens);

    this.RULE('expressions', () => {
      this.MANY(() => {
        this.SUBRULE(this.expression, { LABEL: 'expressions' });
      })
    });

    // Ordered by operation. The higher it is, the more precedence.
    this.RULE('expression', () => {
      this.OR([
        // Numbers
        { ALT: () => this.SUBRULE(this.whole_number_expression, { LABEL: 'expression'}) },
        { ALT: () => this.SUBRULE(this.real_number_expression, { LABEL: 'expression'}) },

        // Grouping
        { ALT: () => this.SUBRULE(this.parenthesis_expression, { LABEL: 'expression'}) },

        // Mathematical Functions
        { ALT: () => this.SUBRULE(this.absolute_expression, { LABEL: 'expression'}) },
        { ALT: () => this.SUBRULE(this.ceil_expression, { LABEL: 'expression'}) },
        { ALT: () => this.SUBRULE(this.floor_expression, { LABEL: 'expression'}) },
        { ALT: () => this.SUBRULE(this.round_expression, { LABEL: 'expression'}) },

        // Dice
        { ALT: () => this.SUBRULE(this.die_expression, { LABEL: 'expression'}) },

        // Algebra
        { ALT: () => this.SUBRULE(this.exponential_expression, { LABEL: 'expression'}) },
        { ALT: () => this.SUBRULE(this.multiply_expression, { LABEL: 'expression'}) },
        { ALT: () => this.SUBRULE(this.divide_expression, { LABEL: 'expression'}) },
        { ALT: () => this.SUBRULE(this.modulus_expression, { LABEL: 'expression'}) },

        { ALT: () => this.SUBRULE(this.addition_expression, { LABEL: 'expression'}) },
        { ALT: () => this.SUBRULE(this.minus_expression, { LABEL: 'expression'}) },
      ]);
    });

    // While the above is ordered by order of operations, the below is
    // ordered alphabetically.
    this.RULE("absolute_expression", () => {
      this.CONSUME(token_operator_absolute);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'expression' });
    });

    this.RULE("addition_expression", () => {
      this.CONSUME(token_operator_plus);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
    });

    this.RULE("ceil_expression", () => {
      this.CONSUME(token_operator_ceil);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'expression' });
    });

    this.RULE('die_expression', () => {
      this.CONSUME(token_operator_dice);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
    });

    this.RULE("divide_expression", () => {
      this.CONSUME(token_operator_divide);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
    });

    this.RULE("exponential_expression", () => {
      this.CONSUME(token_operator_exponent);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
    });

    this.RULE("floor_expression", () => {
      this.CONSUME(token_operator_floor);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'expression' });
    });

    this.RULE("minus_expression", () => {
      this.CONSUME(token_operator_minus);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
    });

    this.RULE("modulus_expression", () => {
      this.CONSUME(token_operator_modulus);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
    });

    this.RULE("multiply_expression", () => {
      this.CONSUME(token_operator_multiply);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
    });

    this.RULE('parenthesis_expression', () => {
      this.CONSUME(token_bracket_round_open);
      this.SUBRULE(this.expressions, { LABEL: 'expression' });
      this.CONSUME(token_bracket_round_close);
    });

    this.RULE('real_number_expression', () => {
      this.CONSUME(token_operator_dot);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
    });

    this.RULE("round_expression", () => {
      this.CONSUME(token_operator_round);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'expression' });
    });

    this.RULE('whole_number_expression', () => {
      this.AT_LEAST_ONE(() => { this.SUBRULE(this.whole_number) });
    });

    this.RULE('whole_number', () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.whole_number_zero) },
        { ALT: () => this.SUBRULE(this.whole_number_one) },
        { ALT: () => this.SUBRULE(this.whole_number_two) },
        { ALT: () => this.SUBRULE(this.whole_number_three) },
        { ALT: () => this.SUBRULE(this.whole_number_four) },
        { ALT: () => this.SUBRULE(this.whole_number_five) },
        { ALT: () => this.SUBRULE(this.whole_number_six) },
        { ALT: () => this.SUBRULE(this.whole_number_seven) },
        { ALT: () => this.SUBRULE(this.whole_number_eight) },
        { ALT: () => this.SUBRULE(this.whole_number_nine) },
      ]);
    });

    this.RULE('whole_number_zero', () => {
      this.CONSUME(token_number_zero);
    });

    this.RULE('whole_number_one', () => {
      this.CONSUME(token_number_one);
    });

    this.RULE('whole_number_two', () => {
      this.CONSUME(token_number_two);
    });

    this.RULE('whole_number_three', () => {
      this.CONSUME(token_number_three);
    });

    this.RULE('whole_number_four', () => {
      this.CONSUME(token_number_four);
    });

    this.RULE('whole_number_five', () => {
      this.CONSUME(token_number_five);
    });

    this.RULE('whole_number_six', () => {
      this.CONSUME(token_number_six);
    });

    this.RULE('whole_number_seven', () => {
      this.CONSUME(token_number_seven);
    });

    this.RULE('whole_number_eight', () => {
      this.CONSUME(token_number_eight);
    });

    this.RULE('whole_number_nine', () => {
      this.CONSUME(token_number_nine);
    });

    this.performSelfAnalysis()
  }
}

export const getParser = () => new Parser([
  token_bracket_round_close,
  token_bracket_round_open,

  token_operator_absolute,
  token_operator_ceil,
  token_operator_dice,
  token_operator_divide,
  token_operator_dot,
  token_operator_exponent,
  token_operator_floor,
  token_operator_minus,
  token_operator_modulus,
  token_operator_multiply,
  token_operator_plus,
  token_operator_round,

  token_number_zero,
  token_number_one,
  token_number_two,
  token_number_three,
  token_number_four,
  token_number_five,
  token_number_six,
  token_number_seven,
  token_number_eight,
  token_number_nine,
]);

export default getParser();