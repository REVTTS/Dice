import lexer from './lexer.js';
import { Interpreter } from './interpreter.js';
import { getParser } from './parser.js';
import getPRNG from './prng.js';

export class Dice {
  constructor(prng) {
    this.parser = getParser();

    if (!!prng) {
      this.interpreter = new Interpreter(prng);
    } else {
      const got_prng = getPRNG()
      this.interpreter = new Interpreter(got_prng.prng);
    }
  }

  roll(input) {
    // Tokenize the input with our lexer.
    const lex_result = lexer.tokenize(input);

    if (lex_result.errors.length > 0) {
      const offset = lex_result.errors[0].offset;
      throw new Error(`Unexpected character "${input.charAt(offset)}" at position: ${offset}`);
    }

    // Pass our tokens into our parser
    this.parser.input = lex_result.tokens
    const cst = this.parser.expression();

    // Interpret the parsed tokens and return the result.
    return this.interpreter.visit(cst);
  }
}

export default Dice;