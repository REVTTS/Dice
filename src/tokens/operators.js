/*
  Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

  This file is part of @revtts/Dice.

  @revtts/Dice is free software: you can redistribute it and/or modify it under the terms of
  the GNU General Public License as published by the Free Software Foundation, either
  version 3 of the License, or any later version.

  @revtts/Dice is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
  PURPOSE. See the GNU General Public License for more details.

  You should have received a copy of the GNU General Public License along with @revtts/Dice.
  If not, see <https://www.gnu.org/licenses/>. 
*/

import { createToken } from "chevrotain";

export const token_operator_absolute = createToken({
  name: 'abs',
  pattern: /abs/,
});

export const token_operator_ceil = createToken({
  name: 'ceil',
  pattern: /ceil/,
});

export const token_operator_dice = createToken({
  name: 'd',
  pattern: /[dD]/,
});

export const token_operator_divide = createToken({
  name: 'divide',
  pattern: /\//,
});

export const token_operator_dot = createToken({
  name: 'dot',
  pattern: /\./,
});

export const token_operator_exponent = createToken({
  name: 'exponent',
  pattern: /\*\*/,
});

export const token_operator_floor = createToken({
  name: 'floor',
  pattern: /floor/,
});

export const token_operator_modulus = createToken({
  name: 'modulus',
  pattern: /\%/,
});

export const token_operator_minus = createToken({
  name: 'minus',
  pattern: /\-/,
});

export const token_operator_multiply = createToken({
  name: 'multiply',
  pattern: /\*/,
});

export const token_operator_plus = createToken({
  name: 'plus',
  pattern: /\+/,
});

export const token_operator_round = createToken({
  name: 'round',
  pattern: /round/,
});
