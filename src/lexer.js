import { Lexer } from 'chevrotain';
import tokens from './tokens';

const multiModeLexerDefinition = {
  modes: {
    dice_mode: [
      tokens.d,
      tokens.digit,
    ],
  },
  defaultMode: 'dice_mode',
}

export default new Lexer(multiModeLexerDefinition);