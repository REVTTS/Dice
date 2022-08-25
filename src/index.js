import lexer from './lexer.js';
import { Interpreter } from './interpreter.js';
import { getParser } from './parser.js';
import getPRNG from './prng.js';

export class Dice {
  constructor(input, prng) {
    const lex_result = lexer.tokenize(input);
    if (lex_result.errors.length > 0) {
      const offset = lex_result.errors[0].offset;
      throw new Error(`Unexpected character "${input.charAt(offset)}" at position: ${offset}`);
    }
    const parser = getParser();

    parser.input = lex_result.tokens
    this.cst = parser.expression();

    if (!!prng) {
      this.interpreter = new Interpreter(prng);
    } else {
      const got_prng = getPRNG()
      this.interpreter = new Interpreter(got_prng.prng);
    }
  }

  roll() {
    return this.interpreter.visit(this.cst);
  }
}

export default Dice;