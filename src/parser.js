import { CstParser } from 'chevrotain';
import { tokens } from './tokens';

export class Parser extends CstParser {
  constructor(tokens) {
    super(tokens);

    this.RULE('die_statement', () => {
      this.SUBRULE(this.integer_statement);
      this.CONSUME(tokens.digit);
      this.SUBRULE(this.integer_statement);
    });

    this.RULE('integer_statement', () => {
      this.MANY(() => {
        this.CONSUME(tokens.digit);
      });
    });
  }
}

export default new Parser(tokens);