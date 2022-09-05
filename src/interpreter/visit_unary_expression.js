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

export const visit_unary_expression = (ctx, operator_wrap_fn, operator_function, visit_function, options) => {
  const visit = visit_function(ctx.expression, options);
  const value =
    operator_function(
      visit.values.reduce((accumulator, value) => accumulator + value)
    );

  const new_outputs = visit.outputs.map((output) => operator_wrap_fn(output));

  return {
    outputs: [...new_outputs, options.formatter.format_result(value)],
    values: [value],
  };
};
