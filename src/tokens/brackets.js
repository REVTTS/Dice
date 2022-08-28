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

import { createToken } from 'chevrotain';

// Angle Brackets
export const token_bracket_angle_close = createToken({
  name: 'bracket_angle_close',
  pattern: />/,
});

export const token_bracket_angle_open = createToken({
  name: 'bracket_angle_open',
  pattern: /</,
});


// Curley Brackets
export const token_bracket_curley_close = createToken({
  name: 'bracket_curley_close',
  pattern: /\}/,
});

export const token_bracket_curley_open = createToken({
  name: 'bracket_curley_open',
  pattern: /\{/,
});


// Round Brackets, aka parenthesis
export const token_bracket_round_close = createToken({
  name: 'bracket_round_close',
  pattern: /\)/,
});

export const token_bracket_round_open = createToken({
  name: 'bracket_round_open',
  pattern: /\(/,
});


// Square Brackets
export const token_bracket_square_close = createToken({
  name: 'bracket_square_close',
  pattern: /\]/,
});

export const token_bracket_square_open = createToken({
  name: 'bracket_square_open',
  pattern: /\[/,
});
