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

const zip_outputs = (arrays, operator) => {
  const array_one = arrays.shift();
  const array_two = arrays.shift();

  const zipped_output = Array.from(
    Array(
      Math.max(array_one.length, array_two.length)
    ),
    (_, i) => {
      const array_one_value = array_one[i] || array_one[array_one.length-1];
      const array_two_value = array_two[i] || array_two[array_two.length-1];

      return `${array_one_value}${operator}${array_two_value}`;
    }
  );

  if (arrays.length > 0) {
    return zip_outputs([zipped_output, ...arrays], operator);
  }

  return zipped_output;
};

function unary_expression(ctx, operator_wrap_fn, operator_function, visit_function, options) {
  const visit = visit_function(ctx.expression, options);
  const visit_value = do_add_values(visit.values);
  const value = operator_function(visit_value);

  const new_outputs = visit.outputs.map((output) => operator_wrap_fn(output));

  return {
    outputs: [...new_outputs, options.formatter.format_result(`${value}`)],
    values: [value],
  };
}

const do_add_values = values => values.reduce((accumulator, value) => (accumulator + value));
const do_divide_values = values => values.reduce((accumulator, value) => (accumulator / value));
const do_exponential_values = values => values.reduce((accumulator, value) => (accumulator ** value));
const do_minus_values = values => values.reduce((accumulator, value) => (accumulator - value));
const do_modulus_values = values => values.reduce((accumulator, value) => (accumulator % value));
const do_multiply_values = values => values.reduce((accumulator, value) => (accumulator * value));

function binary_expression(ctx, operator, operator_function, visit_function, options) {
  let left_hand_visit = visit_function(ctx.left_hand, options);

  if (ctx.right_hand) {
    // Visit each item in the right hand array.
    const right_hand_visits = ctx.right_hand.map(right_hand => visit_function(right_hand, options));
    const right_hand_outputs = right_hand_visits.map(right_hand_visit => right_hand_visit.outputs);

    // We've got an array of an array of values.
    // So we condense it down to an array of values.
    const right_hand_values = right_hand_visits.map(visit => do_add_values(visit.values));

    const value = operator_function([
      do_add_values(left_hand_visit.values),
      ...right_hand_values
    ]);

    // return our total values together in our own array of values.
    return {
      outputs: [...zip_outputs([left_hand_visit.outputs, ...right_hand_outputs], operator), options.formatter.format_result(`${value}`)],
      values: [value],
    };
  }

  return left_hand_visit;
}

export class Interpreter extends BaseSQLVisitor {
  constructor() {
    super();

    this.validateVisitor();
  }

  expression(ctx, options) {
    return this.visit(ctx.expression, options);
  }

  // Interpreter methods are ordered alphabetically.

  absolute_expression(ctx, options) {
    return unary_expression(ctx, (output) => `abs(${output})`, Math.abs, this.visit.bind(this), options);
  }

  addition_expression(ctx, options) {
    return binary_expression(ctx, '+', do_add_values, this.visit.bind(this), options);
  }

  atomic_expression(ctx, options) {
    return this.visit(ctx.expression, options);
  }

  ceil_expression(ctx, options) {
    return unary_expression(ctx, (output) => `ceil(${output})`, Math.ceil, this.visit.bind(this), options);
  }

  die_expression(ctx, options) {
    const left_hand_visit = this.visit(ctx.left_hand, options);
  
    if (ctx.right_hand) {
      // Visit each item in the right hand array.
      const right_hand_visits = ctx.right_hand.map(right_hand => this.visit(right_hand, options));
      const right_hand_outputs = right_hand_visits.map(right_hand_visit => right_hand_visit.outputs);
  
      // We've got an array of an array of values.
      // So we condense it down to an array of values.
      const right_hand_values = right_hand_visits.map(visit => do_add_values(visit.values));

      const values = right_hand_values.reduce((previous_values, die_size) => {
        let num_dice = do_add_values(previous_values);
        const sign = Math.sign(num_dice) * Math.sign(die_size);

        if (sign === 0)
          return [0];
  
        const next_values = [];
        num_dice = Math.abs(num_dice);
        for (let i = 0; i < num_dice; i++)
          next_values.push(sign * Math.floor(options.prng() * Math.abs(die_size) + .9999));

        return next_values;
      }, left_hand_visit.values);

      if (values.length === 0)
        values.push(0);
  
      // return our total values together in our own array of values.
      return {
        outputs: [...zip_outputs([left_hand_visit.outputs, ...right_hand_outputs], 'd'), `[${values.map(value => options.formatter.format_dice_result(value)).join(', ')}]`],
        values,
      };
    }
  
    return left_hand_visit;
  }

  divide_expression(ctx, options) {
    return binary_expression(ctx, '/', do_divide_values, this.visit.bind(this), options);
  }

  exponential_expression(ctx, options) {
    return binary_expression(ctx, '**', do_exponential_values, this.visit.bind(this), options);
  }

  floor_expression(ctx, options) {
    return unary_expression(ctx, (output) => `floor(${output})`, Math.floor, this.visit.bind(this), options);
  }

  minus_expression(ctx, options) {
    return binary_expression(ctx, '-',  do_minus_values, this.visit.bind(this), options);
  }

  modulus_expression(ctx, options) {
    return binary_expression(ctx, '%', do_modulus_values, this.visit.bind(this), options);
  }

  multiply_expression(ctx, options) {
    return binary_expression(ctx, '*', do_multiply_values, this.visit.bind(this), options);
  }

  negative_number_expression(ctx, options) {
    return unary_expression(ctx, (output) => `-${output}`, (input) => -input, this.visit.bind(this), options);
  }

  parenthesis_expression(ctx, options) {
    return unary_expression(ctx, (output) => `(${output})`, (input) => input, this.visit.bind(this), options);
  }

  real_number_expression(ctx, options) {
    if (ctx.right_hand) {
      const right_hand_visit = this.visit(ctx.right_hand, options);
      const num_digits = right_hand_visit.values.length;
      const decimal_value = do_add_values(right_hand_visit.values) / (10 ** num_digits);

      if (ctx.left_hand) {
        const left_hand_visit = this.visit(ctx.left_hand, options);
        const value = do_add_values(left_hand_visit.values) + decimal_value;

        return {
          outputs: [...zip_outputs([left_hand_visit.outputs, right_hand_visit.outputs], '.'), options.formatter.format_result(`${value}`)],
          values: [value],
        };
      }

      const new_outputs = right_hand_visit.outputs.map((output) => `.${output}`);

      return {
        outputs: [...new_outputs, options.formatter.format_result(`${decimal_value}`)],
        values: [decimal_value],
      };
    }

    return this.visit(ctx.left_hand, options);
  }

  round_expression(ctx, options) {
    return unary_expression(ctx, (output) => `round(${output})`, Math.round, this.visit.bind(this), options);
  }

  whole_number_expression(ctx) {
    let values = [];

    const length = ctx.whole_number.length;

    for (let i in ctx.whole_number) {
      values.push(this.visit(ctx.whole_number[i]) * (10 ** (length - 1 - i)));
    }

    return {
      outputs: [`${do_add_values(values)}`],
      values,
    };
  }

  whole_number(ctx) {
    const key = Object.keys(ctx)[0];
    return this.visit(ctx[key]);
  }

  whole_number_zero()  { return 0; }
  whole_number_one()   { return 1; }
  whole_number_two()   { return 2; }
  whole_number_three() { return 3; }
  whole_number_four()  { return 4; }
  whole_number_five()  { return 5; }
  whole_number_six()   { return 6; }
  whole_number_seven() { return 7; }
  whole_number_eight() { return 8; }
  whole_number_nine()  { return 9; }

  variable_expression(ctx, options) {
    const value = options.variables.get(ctx.string[0].image) || 0;
    return {
      outputs: [`${value}`],
      values: [value],
    };
  }

}

const interpreter = new Interpreter(Math.random);

export default interpreter;