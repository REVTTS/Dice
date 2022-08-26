import { createToken, Lexer } from "chevrotain";

export const token_whitespace = createToken({
  name: 'whitespace',
  pattern: /\s/,
});

export const token_whitespace_skip = createToken({
  group: Lexer.SKIPPED,
  name: 'whitespace',
  pattern: /\s/
})