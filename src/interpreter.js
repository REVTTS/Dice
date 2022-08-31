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

const sum_values = values => values.reduce((accumulator, value) => accumulator + value, 0);

export class Interpreter extends BaseSQLVisitor {
  constructor(prng) {
    super();

    this.prng = prng;
    this.validateVisitor();
  }

  expressions(ctx) {
    let accumulator = {
      values: [],
    };

    if (ctx.expressions) {
      for (let expression of ctx.expressions) {
        accumulator = this.visit(expression, accumulator);
      }
    
      return accumulator;
    }
    
    return accumulator;
  }

  expression(ctx, accumulator) {
    return this.visit(ctx.expression, accumulator);
  }

  // Interpreter methods are ordered alphabetically.

  absolute_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      values: [Math.abs(sum_values(visit.values))],
    };
  }

  addition_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    if (accumulator) {
      return {
        values: [sum_values(accumulator.values) + sum_values(visit.values)],
      };
    }

    return {
      values: [sum_values(visit.values)],
    };
  }

  ceil_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      values: [Math.ceil(sum_values(visit.values))],
    };
  }

  die_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);
    let values = [];

    const num_die = sum_values(accumulator.values);
    const die_size = sum_values(visit.values);

    for (let i = 0; i < num_die; i++) {
      values.push(Math.floor((this.prng() * die_size)) + 1);
    }

    return {
      values,
    };
  }

  divide_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    return {
      values: [sum_values(accumulator.values) / sum_values(visit.values)],
    };
  }

  exponential_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    return {
      values: [sum_values(accumulator.values) ** sum_values(visit.values)],
    };
  }

  floor_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      values: [Math.floor(sum_values(visit.values))],
    };
  }

  minus_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    if (accumulator) {
      return {
        values: [sum_values(accumulator.values) - sum_values(visit.values)],
      };
    }

    return {
      values: [-sum_values(visit.values)],
    };
  }

  modulus_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    return {
      values: [sum_values(accumulator.values) % sum_values(visit.values)],
    };
  }

  multiply_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    return {
      values: [sum_values(accumulator.values) * sum_values(visit.values)],
    };
  }

  parenthesis_expression(ctx) {
    const visit = this.visit(ctx.expression);
  
    return {
      values: visit.values,
    };
  }

  real_number_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);
    const num_digits = visit.values.length;
    const decimal_value = sum_values(visit.values) / (10 ** num_digits);

    if (accumulator) {
      return {
        values: [sum_values(accumulator.values) + decimal_value],
      };
    }

    return {
      values: [decimal_value],
    };
  }

  round_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      values: [Math.round(sum_values(visit.values))],
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