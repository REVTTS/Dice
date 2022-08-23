import { createToken } from "chevrotain";

export const integer = createToken({
  name: 'digit',
  pattern: /\d/
});

export const string = createToken({
  name: 'character',
  pattern: /[a-zA-Z]/
});

export const whitespace = createToken({
  name: 'whitespace',
  pattern: /\S/
});

export default [
  integer,
  string,
  whitespace,
];
