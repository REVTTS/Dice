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

import { Lexer } from 'chevrotain';

import {
  token_bracket_curley_open,
  token_bracket_curley_close,
  token_bracket_round_close,
  token_bracket_round_open,
} from './tokens/brackets.js';
import * as operator_tokens from './tokens/operators.js';
import { token_string } from './tokens/string.js';
import * as number_tokens from './tokens/numbers.js';


import { token_whitespace_skip } from './tokens/whitespace.js';

const tokens = [
  token_bracket_curley_open,
  token_bracket_curley_close,
  token_bracket_round_close,
  token_bracket_round_open,
  ...Object.values(operator_tokens),
  ...Object.values(number_tokens),
  token_whitespace_skip,
  token_string,
];

export default new Lexer(
  tokens,
  { ensureOptimizations: true }
);