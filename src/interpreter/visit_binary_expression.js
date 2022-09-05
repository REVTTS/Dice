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

export const visit_binary_expression = (ctx, operator_wrap_fn, operator_function, visit_function, options) => {
  let left_hand_visit = visit_function(ctx.left_hand, options);

  if (ctx.right_hand) {
    // Visit each item in the right hand array.
    const right_hand_visits = ctx.right_hand.map(right_hand => visit_function(right_hand, options));
    const right_hand_outputs = right_hand_visits.map(right_hand_visit => right_hand_visit.outputs);

    // We've got an array of an array of values.
    // So we condense it down to an array of values.
    const right_hand_values = right_hand_visits.map(visit => visit.values.reduce((accumulator, value) => accumulator + value));

    const values = operator_function(
      left_hand_visit.values,
      right_hand_values
    );

    // return our total values together in our own array of values.
    return {
      outputs: [...zip_outputs([left_hand_visit.outputs, ...right_hand_outputs], operator_wrap_fn), options.formatter.format_results(values.map(value => options.formatter.format_result(value)))],
      values,
    };
  }

  return left_hand_visit;
};
