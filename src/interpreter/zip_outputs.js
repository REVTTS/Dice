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

export const zip_outputs = (arrays, operator_wrap_fn) => {
  const array_one = arrays.shift();
  const array_two = arrays.shift();

  const zipped_output = Array.from(
    Array(
      Math.max(array_one.length, array_two.length)
    ),
    (_, i) => {
      const array_one_value = array_one[i] || array_one[array_one.length-1];
      const array_two_value = array_two[i] || array_two[array_two.length-1];

      return `${array_one_value}${operator_wrap_fn(array_two_value)}`;
    }
  );

  if (arrays.length > 0) {
    return zip_outputs([zipped_output, ...arrays], operator_wrap_fn);
  }

  return zipped_output;
};