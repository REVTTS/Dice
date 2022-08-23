import { CstParser } from 'chevrotain';
import tokens from './tokens';

export class Parser extends CstParser {
  constructor(tokens) {
    super(tokens);

    this.RULE('expression', () => {
      this.SUBRULE(this.die_expression);
    })

    this.RULE('die_expression', () => {
      this.SUBRULE(this.integer_expression, { LABEL: "num_die" });
      this.CONSUME(tokens.d);
      this.SUBRULE2(this.integer_expression, { LABEL: "die_size" });
    });

    this.RULE('integer_expression', () => {
      this.AT_LEAST_ONE(() => { this.SUBRULE(this.integer) });
    });

    this.RULE('integer', () => {

      this.OR([
        { ALT: () => this.SUBRULE(this.integer_zero) },
        { ALT: () => this.SUBRULE(this.integer_one) },
        { ALT: () => this.SUBRULE(this.integer_two) },
        { ALT: () => this.SUBRULE(this.integer_three) },
        { ALT: () => this.SUBRULE(this.integer_four) },
        { ALT: () => this.SUBRULE(this.integer_five) },
        { ALT: () => this.SUBRULE(this.integer_six) },
        { ALT: () => this.SUBRULE(this.integer_seven) },
        { ALT: () => this.SUBRULE(this.integer_eight) },
        { ALT: () => this.SUBRULE(this.integer_nine) },
      ]);
    });

    this.RULE('integer_zero', () => {
      this.CONSUME(tokens.number_zero);
    });

    this.RULE('integer_one', () => {
      this.CONSUME(tokens.number_one);
    });

    this.RULE('integer_two', () => {
      this.CONSUME(tokens.number_two);
    });

    this.RULE('integer_three', () => {
      this.CONSUME(tokens.number_three);
    });

    this.RULE('integer_four', () => {
      this.CONSUME(tokens.number_four);
    });

    this.RULE('integer_five', () => {
      this.CONSUME(tokens.number_five);
    });

    this.RULE('integer_six', () => {
      this.CONSUME(tokens.number_six);
    });

    this.RULE('integer_seven', () => {
      this.CONSUME(tokens.number_seven);
    });

    this.RULE('integer_eight', () => {
      this.CONSUME(tokens.number_eight);
    });

    this.RULE('integer_nine', () => {
      this.CONSUME(tokens.number_nine);
    });

    this.performSelfAnalysis()
  }
}

export const getParser = () => new Parser(tokens);

export default getParser();