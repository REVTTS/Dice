import lexer from 'src/lexer';

export const lex = (text) => lexer.tokenize(text);

export const parse = () => {
  return 1;
};

export default {
  lex,
  parse,
}