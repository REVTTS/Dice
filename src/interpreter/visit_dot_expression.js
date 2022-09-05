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
import { zip_outputs } from './zip_outputs.js';

export const visit_dot_expression = (ctx, operator_wrap_fn, operator_function, visit_function, options) => {
  const visit = visit_function(ctx.expression, options);

  const values = operator_function(
    options.accumulator.values,
    visit.values
  );

  return {
    outputs: [...zip_outputs([options.accumulator.outputs, ...visit.outputs], operator_wrap_fn), options.formatter.format_results(values)],
    values,
  };
};
