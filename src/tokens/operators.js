import { createToken } from "chevrotain";

export const absolute = createToken({
  name: 'abs',
  pattern: /abs/,
});

export const ceil = createToken({
  name: 'ceil',
  pattern: /ceil/,
});

export const divide = createToken({
  name: 'divide',
  pattern: /\//,
});

export const exponent = createToken({
  name: 'exponent',
  pattern: /\*\*/,
});

export const floor = createToken({
  name: 'floor',
  pattern: /floor/,
});

export const modulus = createToken({
  name: 'modulus',
  pattern: /\%/,
});

export const minus = createToken({
  name: 'minus',
  pattern: /\-/,
});

export const multiply = createToken({
  name: 'multiply',
  pattern: /\*/,
});

export const plus = createToken({
  name: 'plus',
  pattern: /\+/,
});

export default {
  absolute,
  ceil,
  divide,
  exponent,
  floor,
  minus,
  modulus,
  multiply,
  plus,
};
