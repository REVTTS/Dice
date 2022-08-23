import { createToken } from "chevrotain";

export const asterisk = createToken({
  name: 'asterisk',
  pattern: /\*/
});

export const forward_slash = createToken({
  name: 'forward_slash',
  pattern: /\//
});

export const minus = createToken({
  name: 'minus',
  pattern: /\-/
});

export const plus = createToken({
  name: 'plus',
  pattern: /\+/
});

export default [
  asterisk,
  forward_slash,
  minus,
  plus,
];
