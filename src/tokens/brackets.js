// Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

import { createToken } from "chevrotain";

// Angle Brackets
export const token_bracket_angle_close = createToken({
  name: 'bracket_angle_close',
  pattern: /\>/,
});

export const token_bracket_angle_open = createToken({
  name: 'bracket_angle_open',
  pattern: /\</,
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
