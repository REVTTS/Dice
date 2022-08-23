import lexer from './lexer.js';
import { getParser } from './parser.js';
import interpreter from './interpreter.js';

export class Dice {
  constructor(input) {
    const lex_result = lexer.tokenize(input);
    const parser = getParser();

    parser.input = lex_result.tokens

    const cst = parser.expression();

    const value = interpreter.visit(cst);
  }
}

export default Dice;