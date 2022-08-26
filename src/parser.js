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

    this.RULE('expression', () => {
      this.SUBRULE(this.minus_expression);
    });

    this.RULE("minus_expression", () => {
      this.SUBRULE(this.addition_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(token_operator_minus);
        this.SUBRULE2(this.addition_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("addition_expression", () => {
      this.SUBRULE(this.modulus_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(token_operator_plus);
        this.SUBRULE2(this.modulus_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("modulus_expression", () => {
      this.SUBRULE(this.divide_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(token_operator_modulus);
        this.SUBRULE2(this.divide_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("divide_expression", () => {
      this.SUBRULE(this.multiply_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(token_operator_divide);
        this.SUBRULE2(this.multiply_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("multiply_expression", () => {
      this.SUBRULE(this.exponential_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(token_operator_multiply);
        this.SUBRULE2(this.exponential_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("exponential_expression", () => {
      this.SUBRULE(this.die_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(token_operator_exponent);
        this.SUBRULE2(this.die_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE('die_expression', () => {
      this.SUBRULE(this.atomic_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(token_operator_dice);
        this.SUBRULE2(this.atomic_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("atomic_expression", () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.absolute_expression, { LABEL: 'atomic_expression'}) },
        { ALT: () => this.SUBRULE(this.ceil_expression, { LABEL: 'atomic_expression'}) },
        { ALT: () => this.SUBRULE(this.floor_expression, { LABEL: 'atomic_expression'}) },
        { ALT: () => this.SUBRULE(this.parenthesis_expression, { LABEL: 'atomic_expression'}) },
        { ALT: () => this.SUBRULE(this.negative_expression, { LABEL: 'atomic_expression'}) },
        { ALT: () => this.SUBRULE(this.round_expression, { LABEL: 'atomic_expression'}) },
        { ALT: () => this.SUBRULE(this.real_number_expression, { LABEL: 'atomic_expression'}) },
      ])
    });

    this.RULE("absolute_expression", () => {
      this.CONSUME(token_operator_absolute);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'inner_expression' });
    });

    this.RULE("ceil_expression", () => {
      this.CONSUME(token_operator_ceil);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'inner_expression' });
    });

    this.RULE("floor_expression", () => {
      this.CONSUME(token_operator_floor);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'inner_expression' });
    });

    this.RULE("negative_expression", () => {
      this.CONSUME(token_operator_minus);
      this.SUBRULE(this.atomic_expression, { LABEL: 'inner_expression' });
    });

    this.RULE("round_expression", () => {
      this.CONSUME(token_operator_round);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'inner_expression' });
    });

    this.RULE('parenthesis_expression', () => {
      this.CONSUME(token_bracket_round_open);
      this.SUBRULE(this.expression, { LABEL: 'inner_expression' });
      this.CONSUME(token_bracket_round_close);
    });

    this.RULE('real_number_expression', () => {
      this.SUBRULE(this.whole_number_expression, { LABEL: 'left_hand' });
      this.OPTION(() => {
        this.CONSUME(token_operator_dot);
        this.SUBRULE2(this.whole_number_expression, { LABEL: 'right_hand' });
      })
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