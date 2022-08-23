import { createToken } from "chevrotain";

export const integer = createToken({
  name: 'integer',
  pattern: /\d/,
});

export const character = createToken({
  name: 'character',
  pattern: /[a-zA-Z]/,
});

export const whitespace = createToken({
  name: 'whitespace',
  pattern: /\S/,
});

export default [
  character,
  integer,
  whitespace,
];
