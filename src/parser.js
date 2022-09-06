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
  token_bracket_curley_open,
  token_bracket_curley_close,
  token_bracket_round_close,
  token_bracket_round_open
} from './tokens/brackets.js';
import * as operator_tokens from './tokens/operators.js';
import { token_string } from './tokens/string.js';
import * as number_tokens from './tokens/numbers.js';

export class Parser extends CstParser {
  constructor(tokens) {
    super(tokens);

    // Ordered by operation. The higher it is, the more precedence.
    this.RULE('expression', () => {
      this.SUBRULE(this.minus_expression, { LABEL: 'expression'});
    });

    // While the above is ordered by order of operations, the below is
    // ordered alphabetically.
    this.RULE('absolute_expression', () => {
      this.CONSUME(operator_tokens.token_operator_absolute, { LABEL: 'operator' });
      this.CONSUME(token_bracket_round_open);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
      this.CONSUME(token_bracket_round_close);
    });

    this.RULE('addition_expression', () => {
      this.SUBRULE(this.modulus_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(operator_tokens.token_operator_plus, { LABEL: 'operator' });
        this.SUBRULE2(this.modulus_expression, { LABEL: 'right_hand' });
      });
    });

    // Atomic might not be the right name here.
    // Need to do some reading
    this.RULE('atomic_expression', () => {
      this.OR(
        this.atomic_expression_cache ||
        (this.atomic_expression_cache = [
          { ALT: () => this.SUBRULE(this.absolute_expression, { LABEL: 'expression' }) },
          { ALT: () => this.SUBRULE(this.ceil_expression, { LABEL: 'expression' }) },
          { ALT: () => this.SUBRULE(this.floor_expression, { LABEL: 'expression' }) },
          { ALT: () => this.SUBRULE(this.negative_number_expression, { LABEL: 'expression' }) },
          { ALT: () => this.SUBRULE(this.parenthesis_expression, { LABEL: 'expression' }) },
          { ALT: () => this.SUBRULE(this.round_expression, { LABEL: 'expression' }) },
          { ALT: () => this.SUBRULE(this.variable_expression, { LABEL: 'expression' }) },
          { ALT: () => this.SUBRULE(this.whole_number_expression, { LABEL: 'expression' }) },
        ])
      );
    });

    this.RULE('ceil_expression', () => {
      this.CONSUME(operator_tokens.token_operator_ceil, { LABEL: 'operator' });
      this.CONSUME(token_bracket_round_open);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
      this.CONSUME(token_bracket_round_close);
    });

    this.RULE('die_expression', () => {
      this.SUBRULE(this.real_number_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(operator_tokens.token_operator_die, { LABEL: 'operator' });
        this.SUBRULE2(this.real_number_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE('divide_expression', () => {
      this.SUBRULE(this.multiply_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(operator_tokens.token_operator_divide, { LABEL: 'operator' });
        this.SUBRULE2(this.multiply_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE('dot_expression', () => {
      this.SUBRULE(this.atomic_expression, { LABEL: 'left_hand'});
      this.MANY(() => {
        this.OR([
          { ALT: () => { this.SUBRULE(this.dot_die_expression, { LABEL: 'right_hand' }); } },
        ]);
      });
    });

    this.RULE('dot_die_expression', () => {
      this.CONSUME(operator_tokens.token_operator_alt_die, { LABEL: 'operator' });
      this.CONSUME(token_bracket_round_open);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
      this.CONSUME(token_bracket_round_close);
    });

    this.RULE('exponential_expression', () => {
      this.SUBRULE(this.die_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(operator_tokens.token_operator_exponent, { LABEL: 'operator' });
        this.SUBRULE2(this.die_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE('floor_expression', () => {
      this.CONSUME(operator_tokens.token_operator_floor, { LABEL: 'operator' });
      this.CONSUME(token_bracket_round_open);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
      this.CONSUME(token_bracket_round_close);
    });

    this.RULE('minus_expression', () => {
      this.SUBRULE(this.addition_expression, { LABEL: 'left_hand'});
      this.MANY(() => {
        this.CONSUME(operator_tokens.token_operator_minus, { LABEL: 'operator' });
        this.SUBRULE2(this.addition_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE('modulus_expression', () => {
      this.SUBRULE(this.divide_expression, { LABEL: 'left_hand'});
      this.MANY(() => {
        this.CONSUME(operator_tokens.token_operator_modulus, { LABEL: 'operator' });
        this.SUBRULE2(this.divide_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE('multiply_expression', () => {
      this.SUBRULE(this.exponential_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(operator_tokens.token_operator_multiply, { LABEL: 'operator' });
        this.SUBRULE2(this.exponential_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE('negative_number_expression', () => {
      this.CONSUME(operator_tokens.token_operator_minus);
      this.SUBRULE(this.expression);
    });

    this.RULE('parenthesis_expression', () => {
      this.CONSUME(token_bracket_round_open);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
      this.CONSUME(token_bracket_round_close);
    });

    this.RULE('real_number_expression', () => {
      this.OR([
        {
          ALT: () => {
            this.SUBRULE(this.dot_expression, { LABEL: 'left_hand'});
            // Real number with a leading expression.
            // ie. "1.05"
            // Unlike most other expressions, this is not a MANY.
            // 1.05.05 doesn't make sense afaik.
            this.OPTION(() => {
              this.CONSUME(operator_tokens.token_operator_dot, { LABEL: 'operator' });
              this.SUBRULE2(this.dot_expression, { LABEL: 'right_hand'});
            });
          }
        },
        // Real number without a leading expression.
        // ie. ".05"
        {
          ALT: () => {
            this.CONSUME2(operator_tokens.token_operator_dot, { LABEL: 'operator' });
            this.SUBRULE3(this.dot_expression, { LABEL: 'right_hand'});
          }
        },
      ]);
    });

    this.RULE('round_expression', () => {
      this.CONSUME(operator_tokens.token_operator_round, { LABEL: 'operator' });
      this.CONSUME(token_bracket_round_open);
      this.SUBRULE(this.expression, { LABEL: 'expression' });
      this.CONSUME(token_bracket_round_close);
    });

    this.RULE('whole_number_expression', () => {
      this.AT_LEAST_ONE(() => { this.SUBRULE(this.whole_number); });
    });

    this.RULE('whole_number', () => {
      this.OR(
        this.whole_number_cache ||
        (this.whole_number_cache = [
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
        ])
      );
    });

    this.RULE('whole_number_zero', () => {
      this.CONSUME(number_tokens.token_number_zero);
    });

    this.RULE('whole_number_one', () => {
      this.CONSUME(number_tokens.token_number_one);
    });

    this.RULE('whole_number_two', () => {
      this.CONSUME(number_tokens.token_number_two);
    });

    this.RULE('whole_number_three', () => {
      this.CONSUME(number_tokens.token_number_three);
    });

    this.RULE('whole_number_four', () => {
      this.CONSUME(number_tokens.token_number_four);
    });

    this.RULE('whole_number_five', () => {
      this.CONSUME(number_tokens.token_number_five);
    });

    this.RULE('whole_number_six', () => {
      this.CONSUME(number_tokens.token_number_six);
    });

    this.RULE('whole_number_seven', () => {
      this.CONSUME(number_tokens.token_number_seven);
    });

    this.RULE('whole_number_eight', () => {
      this.CONSUME(number_tokens.token_number_eight);
    });

    this.RULE('whole_number_nine', () => {
      this.CONSUME(number_tokens.token_number_nine);
    });

    this.RULE('variable_expression', () => {
      this.CONSUME(token_bracket_curley_open);
      this.CONSUME(token_string);
      this.CONSUME(token_bracket_curley_close);
    });

    this.performSelfAnalysis();
  }
}

export const getParser = () => new Parser([
  token_bracket_curley_open,
  token_bracket_curley_close,
  token_bracket_round_close,
  token_bracket_round_open,
  ...Object.values(operator_tokens),
  ...Object.values(number_tokens),
  token_string,
]);

export default getParser();