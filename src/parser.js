import { CstParser } from 'chevrotain';
import tokens from './tokens';

export class Parser extends CstParser {
  constructor(tokens) {
    super(tokens);

    this.RULE('expression', () => {
      this.SUBRULE(this.die_expression);
    })

    this.RULE('die_expression', () => {
      this.SUBRULE(this.integer, { LABEL: "num die" });
      this.CONSUME(tokens.d);
      this.SUBRULE2(this.integer, { LABEL: "die size" });
    });

    this.RULE('integer', () => {
      this.MANY(() => {
        this.CONSUME(tokens.digit);
      });
    });

    this.performSelfAnalysis()
  }
}

export const getParser = () => new Parser(tokens);

export default getParser();