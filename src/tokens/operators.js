import { createToken } from "chevrotain";

export const exponent = createToken({
  name: 'exponent',
  pattern: /\*\*/,
});

export const modulus = createToken({
  name: 'modulus',
  pattern: /\%/,
});

export const asterisk = createToken({
  name: 'asterisk',
  pattern: /\*/,
});

export const forward_slash = createToken({
  name: 'forward_slash',
  pattern: /\//,
});

export const minus = createToken({
  name: 'minus',
  pattern: /\-/,
});

export const plus = createToken({
  name: 'plus',
  pattern: /\+/,
});

export default {
  asterisk,
  exponent,
  forward_slash,
  minus,
  modulus,
  plus,
};
