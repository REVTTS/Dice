import { createToken } from "chevrotain";

export const bracket_square_close = createToken({
  name: 'bracket_square_close',
  pattern: /\]/
});

export const bracket_square_open = createToken({
  name: 'bracket_square_open',
  pattern: /\[/
});
