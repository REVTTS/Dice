/*
  Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

  This file is part of REVTTS Dice.

  REVTTS Dice is free software: you can redistribute it and/or modify it under the terms of
  the GNU General Public License as published by the Free Software Foundation, either
  version 3 of the License, or any later version.

  REVTTS Dice is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
  PURPOSE. See the GNU General Public License for more details.

  You should have received a copy of the GNU General Public License along with REVTTS Dice.
  If not, see <https://www.gnu.org/licenses/>. 
*/

export const do_die_values = (prng) =>
  (left_hand_values, right_hand_values) =>
    right_hand_values.reduce(
      (previous_values, die_size) => {
        let num_dice = previous_values.reduce((accumulator, value) => accumulator + value);
        const sign = Math.sign(num_dice) * Math.sign(die_size);

        if (sign === 0)
          return [0];

        const next_values = [];
        num_dice = Math.abs(num_dice);
        for (let i = 0; i < num_dice; i++)
          next_values.push(sign * Math.floor(prng() * Math.abs(die_size) + .9999));

        return next_values;
      },
      left_hand_values
    );
