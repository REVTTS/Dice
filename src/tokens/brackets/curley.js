import { createToken } from "chevrotain";

export const bracket_curley_close = createToken({
  name: 'bracket_curley_close',
  pattern: /\}/,
});

export const bracket_curley_open = createToken({
  name: 'bracket_curley_open',
  pattern: /\{/,
});

export default {
  bracket_curley_close,
  bracket_curley_open,
};
