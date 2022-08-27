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

import lexer from './lexer.js';
import { Interpreter } from './interpreter.js';
import { getParser } from './parser.js';
import getPRNG from './prng.js';

/**
 * @typedef {Object} RollOutput
 * @property {String} image - The image of the string input
 * @property {Number} value - The result of a roll of of the die
 */

export class Dice {
  /**
   * @constructor
   * @param {function} prng A function that returns a number between 0 and 1
   *  non-inclusive.
   * */
  constructor(prng) {
    this.parser = getParser();

    if (!!prng) {
      this.interpreter = new Interpreter(prng);
    } else {
      const got_prng = getPRNG()
      this.interpreter = new Interpreter(got_prng.prng);
    }
  }
  
  /**
   * @function roll
   * @param {string} input A string representation of a die.
   * @returns {RollOutput} The result of the die being rolled.
   * */
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
