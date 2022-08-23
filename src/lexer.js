import { Lexer } from 'chevrotain';
import tokens from './tokens';

const multiModeLexerDefinition = {
  modes: {
    dice_mode: [
      tokens.d,
      tokens.number_zero,
      tokens.number_one,
      tokens.number_two,
      tokens.number_three,
      tokens.number_four,
      tokens.number_five,
      tokens.number_six,
      tokens.number_seven,
      tokens.number_eight,
      tokens.number_nine,
    ],
  },
  defaultMode: 'dice_mode',
}

export default new Lexer(multiModeLexerDefinition);