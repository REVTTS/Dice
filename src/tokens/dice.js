// Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

import { createToken } from "chevrotain";

export const enter_dice_mode = createToken({
  name: '[[',
  pattern: /\[\[/,
});

export const exit_dice_mode = createToken({
  name: ']]',
  pattern: /\]\]/,
});