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

/**
 * @typedef {Object} RollOutput The output from a roll
 * @property {str|any} image A string if undefined, but defined by the formatter
 *  if provided. Unused at this time.
 * @property {Number} value The result of a roll of of the die
 */

/**
 * @typedef {Object} Formatter The object that determines the image of the roll.
 *  This is unused right now, it's a placeholder for future improvements.
 */

/**
 * @typedef {Object} RollOptions
 * @property {Formatter?} formatter The object that determines the image of the roll.
 *  This is unused right now, it's a placeholder for future improvements.
 * @property {Function?} prng A function that returns a number between 0 and 1
 *  non-inclusive. Default is Math.random.
 * @property {Iterable<Iterable>?} variables Values utilized to translate die variable references
 *  into their appropriate values. ex. [ ['strength', 10], ['dexterity', 12] ]
 */

export class Dice {
  constructor() {
    this.interpreter = new Interpreter();
    this.parser = getParser();
  }
  
  /**
   * @function roll
   * @param {string} input A string representation of a die.
   * @param {RollOptions} options How to format the image of the RollOutput.
   * @returns {RollOutput} The result of the die being rolled.
   * */
  roll(input, { prng, variables } = {}) {
    // Tokenize the input with our lexer.
    const lex_result = lexer.tokenize(input);

    if (lex_result.errors.length > 0) {
      const offset = lex_result.errors[0].offset;
      throw new Error(`Unexpected character "${input.charAt(offset)}" at position: ${offset}`);
    }

    // Do we have a prng? If not, set it to Math.random
    if (!prng)
      prng = Math.random;

    // If we don't have variables, start with an empty array
    if (!variables)
      variables = [];

    const variable_map = new Map();
    variables.forEach((key_value) => {
      // TODO: Assert key is a string.
      // TODO: Assert key follows the correct format.
      variable_map.set(key_value[0].toLowerCase(), key_value[1]);
    });

    // Pass our tokens into our parser
    this.parser.input = lex_result.tokens;
    const cst = this.parser.expression();

    // Interpret the parsed tokens and return the result.
    return this.interpreter.visit(cst, {
      prng,
      variables: variable_map
    });
  }
}
