import { createToken, Lexer } from "chevrotain";

export const character = createToken({
  name: 'character',
  pattern: /[a-zA-Z]/,
});

export const whitespace = createToken({
  name: 'whitespace',
  pattern: /\S/,
});

export const whitespace_skip = createToken({
  group: Lexer.SKIPPED,
  name: 'whitespace',
  pattern: /\S/
})

export default {
  character,
  whitespace,
  whitespace_skip,
};
