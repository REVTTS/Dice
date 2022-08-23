import { createToken } from "chevrotain";

export const bracket_angle_close = createToken({
  name: 'bracket_angle_close',
  pattern: />/
});

export const bracket_angle_open = createToken({
  name: 'bracket_angle_open',
  pattern: /</
});
