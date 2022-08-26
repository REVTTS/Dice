// Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

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
