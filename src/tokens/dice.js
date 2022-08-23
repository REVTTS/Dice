import { createToken } from "chevrotain";

export const d = createToken({
  name: 'd',
  pattern: /[dD]/,
});

export const enter_dice_mode = createToken({
  name: '[[',
  pattern: /\[\[/,
});

export const exit_dice_mode = createToken({
  name: ']]',
  pattern: /\]\]/,
});

export default {
  d,
  enter_dice_mode,
  exit_dice_mode,
};