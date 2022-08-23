import { createToken } from "chevrotain";

export const integer = createToken({
  name: 'integer',
  pattern: /\d+/
});

export const string = createToken({
  name: 'string',
  pattern: /[a-zA-Z]+/
});

export const whitespace = createToken({
  name: 'whitespace',
  pattern: /\S+/
});