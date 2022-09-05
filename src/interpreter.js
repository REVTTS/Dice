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

import { do_add_values } from './interpreter/do_add_values.js';
import { do_die_values } from './interpreter/do_die_values.js';
import { do_divide_values } from './interpreter/do_divide_values.js';
import { do_exponential_values } from './interpreter/do_exponential_values.js';
import { do_minus_values } from './interpreter/do_minus_values.js';
import { do_modulus_values } from './interpreter/do_modulus_values.js';
import { do_multiply_values } from './interpreter/do_multiply_values.js';

import { visit_binary_expression } from './interpreter/visit_binary_expression.js';
import { visit_unary_expression } from './interpreter/visit_unary_expression.js';

import { zip_outputs } from './interpreter/zip_outputs.js';
import { visit_dot_expression } from './interpreter/visit_dot_expression.js';

const BaseSQLVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

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
    return visit_unary_expression(ctx, (output) => `abs(${output})`, Math.abs, this.visit.bind(this), options);
  }

  addition_expression(ctx, options) {
    return visit_binary_expression(ctx, input => `+${input}`, do_add_values, this.visit.bind(this), options);
  }

  atomic_expression(ctx, options) {
    return this.visit(ctx.expression, options);
  }

  ceil_expression(ctx, options) {
    return visit_unary_expression(ctx, (output) => `ceil(${output})`, Math.ceil, this.visit.bind(this), options);
  }

  die_expression(ctx, options) {
    return visit_binary_expression(ctx, input => `d${input}`, do_die_values(options.prng), this.visit.bind(this), options);
  }

  dot_expression(ctx, options) {
    const left_hand_visit = this.visit(ctx.left_hand, options);

    if (ctx.right_hand) {
      const accumulator = left_hand_visit;

      ctx.right_hand.forEach(right_hand => this.visit(right_hand, { ...options, accumulator}) );

      return accumulator;
    }

    return left_hand_visit;
  }

  dot_die_expression(ctx, options) {
    return visit_dot_expression(ctx, input => `.die(${input})`, do_die_values(options.prng), this.visit.bind(this), options);
  }

  divide_expression(ctx, options) {
    return visit_binary_expression(ctx, input => `/${input}`, do_divide_values, this.visit.bind(this), options);
  }

  exponential_expression(ctx, options) {
    return visit_binary_expression(ctx, input => `**${input}`, do_exponential_values, this.visit.bind(this), options);
  }

  floor_expression(ctx, options) {
    return visit_unary_expression(ctx, (output) => `floor(${output})`, Math.floor, this.visit.bind(this), options);
  }

  minus_expression(ctx, options) {
    return visit_binary_expression(ctx, input => `-${input}`,  do_minus_values, this.visit.bind(this), options);
  }

  modulus_expression(ctx, options) {
    return visit_binary_expression(ctx, input => `%${input}`, do_modulus_values, this.visit.bind(this), options);
  }

  multiply_expression(ctx, options) {
    return visit_binary_expression(ctx, input => `*${input}`, do_multiply_values, this.visit.bind(this), options);
  }

  negative_number_expression(ctx, options) {
    return visit_unary_expression(ctx, (output) => `-${output}`, (input) => -input, this.visit.bind(this), options);
  }

  parenthesis_expression(ctx, options) {
    return visit_unary_expression(ctx, (output) => `(${output})`, (input) => input, this.visit.bind(this), options);
  }

  real_number_expression(ctx, options) {
    if (ctx.right_hand) {
      const right_hand_visit = this.visit(ctx.right_hand, options);
      const num_digits = right_hand_visit.values.length;
      const decimal_value = right_hand_visit.values.reduce((accumulator, value) => accumulator + value) / (10 ** num_digits);

      if (ctx.left_hand) {
        const left_hand_visit = this.visit(ctx.left_hand, options);
        const value = left_hand_visit.values.reduce((accumulator, value) => accumulator + value) + decimal_value;

        return {
          outputs: [...zip_outputs([left_hand_visit.outputs, right_hand_visit.outputs], input => `.${input}`), options.formatter.format_result(value)],
          values: [value],
        };
      }

      const new_outputs = right_hand_visit.outputs.map((output) => `.${output}`);

      return {
        outputs: [...new_outputs, options.formatter.format_result(decimal_value)],
        values: [decimal_value],
      };
    }

    return this.visit(ctx.left_hand, options);
  }

  round_expression(ctx, options) {
    return visit_unary_expression(ctx, (output) => `round(${output})`, Math.round, this.visit.bind(this), options);
  }

  whole_number_expression(ctx) {
    let values = [];

    const length = ctx.whole_number.length;

    for (let i in ctx.whole_number) {
      values.push(this.visit(ctx.whole_number[i]) * (10 ** (length - 1 - i)));
    }

    return {
      outputs: [`${values.reduce((accumulator, value) => accumulator + value)}`],
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