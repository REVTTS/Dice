import lexer from './lexer.js';
import { Interpreter } from './interpreter.js';
import { getParser } from './parser.js';
import getPRNG from './prng.js';

export class Dice {
  constructor(input, prng) {
    const lex_result = lexer.tokenize(input);
    const parser = getParser();

    parser.input = lex_result.tokens
    this.cst = parser.expression();

    if (prng) {
      this.interpreter = new Interpreter(prng);
    } else {
      this.interpreter = new Interpreter(getPRNG());
    }
  }

  roll() {
    return this.interpreter.visit(this.cst);
  }
}

export default Dice;