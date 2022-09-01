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

import parser from './parser.js';

const BaseSQLVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

const do_add_values = values => values.reduce((accumulator, value) => (accumulator + value));
const do_divide_values = values => values.reduce((accumulator, value) => (accumulator / value));
const do_exponential_values = values => values.reduce((accumulator, value) => (accumulator ** value));
const do_minus_values = values => values.reduce((accumulator, value) => (accumulator - value));
const do_modulus_values = values => values.reduce((accumulator, value) => (accumulator % value));
const do_multiply_values = values => values.reduce((accumulator, value) => (accumulator * value));

function binary_expression(ctx, operator_function, visit_fn) {
  let left_hand_visit = visit_fn(ctx.left_hand);

  if (ctx.right_hand) {
    // Visit each item in the right hand array.
    const right_hand_visits = ctx.right_hand.map(right_hand => visit_fn(right_hand));

    // We've got an array of an array of values.
    // So we condense it down to an array of values.
    const right_hand_values = right_hand_visits.map(visit => do_add_values(visit.values));

    // return our total values together in our own array of values.
    return {
      values: [
        operator_function([
          do_add_values(left_hand_visit.values),
          ...right_hand_values
        ])
      ],
    };
  }

  return {
    values: left_hand_visit.values,
  };
}

export class Interpreter extends BaseSQLVisitor {
  constructor(prng) {
    super();

    this.prng = prng;
    this.validateVisitor();
  }

  expression(ctx) {
    return this.visit(ctx.expression);
  }

  // Interpreter methods are ordered alphabetically.

  absolute_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      values: [Math.abs(do_add_values(visit.values))],
    };
  }

  addition_expression(ctx) {
    return binary_expression(ctx, do_add_values, this.visit.bind(this));
  }

  atomic_expression(ctx) {
    return this.visit(ctx.expression);
  }

  ceil_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      values: [Math.ceil(do_add_values(visit.values))],
    };
  }

  die_expression(ctx) {
    const left_hand_visit = this.visit(ctx.left_hand);
  
    if (ctx.right_hand) {
      // Visit each item in the right hand array.
      const right_hand_visits = ctx.right_hand.map(right_hand => this.visit(right_hand));
  
      // We've got an array of an array of values.
      // So we condense it down to an array of values.
      const right_hand_values = right_hand_visits.map(visit => do_add_values(visit.values));

      const values = right_hand_values.reduce((previous_values, die_size) => {
        const next_values = [];
        const num_dice = do_add_values(previous_values);

        for (let i = 0; i < num_dice; i++) {
          next_values.push(Math.floor(this.prng() * die_size + .9999));
        }

        return next_values;
      }, left_hand_visit.values);

      if (values.length === 0) {
        values.push(0);
      }
  
      // return our total values together in our own array of values.
      return {
        values,
      };
    }
  
    return {
      values: [do_add_values(left_hand_visit.values)],
    };
  }

  divide_expression(ctx) {
    return binary_expression(ctx, do_divide_values, this.visit.bind(this));
  }

  dot_expression(ctx) {
    return this.visit(ctx.expression);
  }

  exponential_expression(ctx) {
    return binary_expression(ctx, do_exponential_values, this.visit.bind(this));
  }

  floor_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      values: [Math.floor(do_add_values(visit.values))],
    };
  }

  minus_expression(ctx) {
    return binary_expression(ctx, do_minus_values, this.visit.bind(this));
  }

  modulus_expression(ctx) {
    return binary_expression(ctx, do_modulus_values, this.visit.bind(this));
  }

  multiply_expression(ctx) {
    return binary_expression(ctx, do_multiply_values, this.visit.bind(this));
  }

  negative_number_expression(ctx) {
    return {
      values: [-do_add_values(this.visit(ctx.expression).values)],
    };
  }

  parenthesis_expression(ctx) {
    return this.visit(ctx.expression);
  }

  real_number_expression(ctx) {
    if (ctx.right_hand) {
      const right_hand_visit = this.visit(ctx.right_hand);
      const num_digits = right_hand_visit.values.length;
      const decimal_value = do_add_values(right_hand_visit.values) / (10 ** num_digits);
      if (ctx.left_hand) {
        return {
          values: [do_add_values(this.visit(ctx.left_hand).values) + decimal_value],
        };
      }

      return {
        values: [decimal_value],
      };
    }

    return this.visit(ctx.left_hand);
  }

  round_expression(ctx) {
    return {
      values: [Math.round(do_add_values(this.visit(ctx.expression).values))],
    };
  }

  whole_number_expression(ctx) {
    let values = [];

    const length = ctx.whole_number.length;

    for (let i in ctx.whole_number) {
      const visit = this.visit(ctx.whole_number[i]);
      values.push(visit.values[0] * (10 ** (length - 1 - i)));
    }

    return {
      values,
    };
  }

  whole_number(ctx) {
    const key = Object.keys(ctx)[0];
    return this.visit(ctx[key]);
  }

  whole_number_zero()  { return { values: [0] }; }
  whole_number_one()   { return { values: [1] }; }
  whole_number_two()   { return { values: [2] }; }
  whole_number_three() { return { values: [3] }; }
  whole_number_four()  { return { values: [4] }; }
  whole_number_five()  { return { values: [5] }; }
  whole_number_six()   { return { values: [6] }; }
  whole_number_seven() { return { values: [7] }; }
  whole_number_eight() { return { values: [8] }; }
  whole_number_nine()  { return { values: [9] }; }

}

const interpreter = new Interpreter(Math.random);

export default interpreter;