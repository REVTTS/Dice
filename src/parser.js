import { CstParser } from 'chevrotain';
import tokens from './tokens/index.js';

export class Parser extends CstParser {
  constructor(tokens) {
    super(tokens);

    this.RULE('expression', () => {
      this.SUBRULE(this.minus_expression);
    });

    this.RULE("minus_expression", () => {
      this.SUBRULE(this.addition_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(tokens.minus);
        this.SUBRULE2(this.addition_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("addition_expression", () => {
      this.SUBRULE(this.modulus_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(tokens.plus);
        this.SUBRULE2(this.modulus_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("modulus_expression", () => {
      this.SUBRULE(this.divide_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(tokens.modulus);
        this.SUBRULE2(this.divide_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("divide_expression", () => {
      this.SUBRULE(this.multiply_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(tokens.divide);
        this.SUBRULE2(this.multiply_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("multiply_expression", () => {
      this.SUBRULE(this.exponential_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(tokens.multiply);
        this.SUBRULE2(this.exponential_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE("exponential_expression", () => {
      this.SUBRULE(this.die_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(tokens.exponent);
        this.SUBRULE2(this.die_expression, { LABEL: 'right_hand' });
      });
    });

    this.RULE('die_expression', () => {
      this.SUBRULE(this.atomic_expression, { LABEL: 'left_hand' });
      this.MANY(() => {
        this.CONSUME(tokens.d);
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
      this.CONSUME(tokens.absolute);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'inner_expression' });
    });

    this.RULE("ceil_expression", () => {
      this.CONSUME(tokens.ceil);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'inner_expression' });
    });

    this.RULE("floor_expression", () => {
      this.CONSUME(tokens.floor);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'inner_expression' });
    });

    this.RULE("negative_expression", () => {
      this.CONSUME(tokens.minus);
      this.SUBRULE(this.atomic_expression, { LABEL: 'inner_expression' });
    });

    this.RULE("round_expression", () => {
      this.CONSUME(tokens.round);
      this.SUBRULE(this.parenthesis_expression, { LABEL: 'inner_expression' });
    });

    this.RULE('parenthesis_expression', () => {
      this.CONSUME(tokens.bracket_round_open);
      this.SUBRULE(this.expression, { LABEL: 'inner_expression' });
      this.CONSUME(tokens.bracket_round_close);
    });

    this.RULE('real_number_expression', () => {
      this.SUBRULE(this.whole_number_expression, { LABEL: 'left_hand' });
      this.OPTION(() => {
        this.CONSUME(tokens.dot);
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
      this.CONSUME(tokens.number_zero);
    });

    this.RULE('whole_number_one', () => {
      this.CONSUME(tokens.number_one);
    });

    this.RULE('whole_number_two', () => {
      this.CONSUME(tokens.number_two);
    });

    this.RULE('whole_number_three', () => {
      this.CONSUME(tokens.number_three);
    });

    this.RULE('whole_number_four', () => {
      this.CONSUME(tokens.number_four);
    });

    this.RULE('whole_number_five', () => {
      this.CONSUME(tokens.number_five);
    });

    this.RULE('whole_number_six', () => {
      this.CONSUME(tokens.number_six);
    });

    this.RULE('whole_number_seven', () => {
      this.CONSUME(tokens.number_seven);
    });

    this.RULE('whole_number_eight', () => {
      this.CONSUME(tokens.number_eight);
    });

    this.RULE('whole_number_nine', () => {
      this.CONSUME(tokens.number_nine);
    });

    this.performSelfAnalysis()
  }
}

export const getParser = () => new Parser(tokens);

export default getParser();