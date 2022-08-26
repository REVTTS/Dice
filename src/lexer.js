import { Lexer } from 'chevrotain';
import {
  token_bracket_round_close,
  token_bracket_round_open
} from './tokens/brackets.js';

import {
  token_operator_absolute,
  token_operator_ceil,
  token_operator_dice,
  token_operator_divide,
  token_operator_dot,
  token_operator_exponent,
  token_operator_floor,
  token_operator_minus,
  token_operator_modulus,
  token_operator_multiply,
  token_operator_plus,
  token_operator_round,
} from './tokens/operators.js';

import {
  token_number_zero,
  token_number_one,
  token_number_two,
  token_number_three,
  token_number_four,
  token_number_five,
  token_number_six,
  token_number_seven,
  token_number_eight,
  token_number_nine,
} from './tokens/numbers.js';

import { token_whitespace_skip } from './tokens/whitespace.js';

const multiModeLexerDefinition = {
  modes: {
    dice_mode: [
      token_bracket_round_close,
      token_bracket_round_open,

      token_operator_absolute,
      token_operator_ceil,
      token_operator_dice,
      token_operator_divide,
      token_operator_dot,
      token_operator_exponent,
      token_operator_floor,
      token_operator_minus,
      token_operator_modulus,
      token_operator_multiply,
      token_operator_plus,
      token_operator_round,

      token_number_zero,
      token_number_one,
      token_number_two,
      token_number_three,
      token_number_four,
      token_number_five,
      token_number_six,
      token_number_seven,
      token_number_eight,
      token_number_nine,

      token_whitespace_skip,
    ],
  },
  defaultMode: 'dice_mode',
}

export default new Lexer(multiModeLexerDefinition);