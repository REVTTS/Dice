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

export class Interpreter extends BaseSQLVisitor {
  constructor(prng) {
    super()

    this.prng = prng;
    this.validateVisitor()
  }

  expressions(ctx) {
    let accumulator = {
      value: 0,
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
      value: Math.abs(visit.value),
    };
  }

  addition_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    if (accumulator) {
      return {
        value: accumulator.value + visit.value,
      }
    }

    return {
      value: visit.value,
    }
  }

  ceil_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      value: Math.ceil(visit.value),
    };
  }

  die_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);
    let value = 0;

    for (let i = 0; i < accumulator.value; i++) {
      value += Math.floor((this.prng() * visit.value)) + 1;
    }

    return {
      value,
    };
  }

  divide_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    return {
      value: accumulator.value / visit.value,
    }
  }

  exponential_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    return {
      value: accumulator.value ** visit.value,
    }
  }

  floor_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      value: Math.floor(visit.value),
    };
  }

  minus_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    if (accumulator) {
      return {
        value: accumulator.value - visit.value,
      }
    }

    return {
      value: -visit.value,
    }
  }

  modulus_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    return {
      value: accumulator.value % visit.value,
    }
  }

  multiply_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);

    return {
      value: accumulator.value * visit.value,
    }
  }

  parenthesis_expression(ctx) {
    const visit = this.visit(ctx.expression);
  
    return {
      value: visit.value,
    }
  }

  real_number_expression(ctx, accumulator) {
    const visit = this.visit(ctx.expression);
    const num_digits = Math.ceil(Math.log10(visit.value+1));
    const decimal_value = visit.value / 10 * num_digits;

    if (accumulator) {
      return {
        value: accumulator.value + decimal_value,
      }
    }

    return {
      value: decimal_value,
    }
  }

  round_expression(ctx) {
    const visit = this.visit(ctx.expression);

    return {
      value: Math.round(visit.value),
    };
  }

  whole_number_expression(ctx) {
    let value = 0;
    for (let whole_number of ctx.whole_number) {
      value = (value * 10) + this.visit(whole_number).value;
    }

    return {
      value,
    }
  }

  whole_number(ctx) {
    const key = Object.keys(ctx)[0]
    return this.visit(ctx[key]);
  }

  whole_number_zero(ctx)  { return { value: 0 }; }
  whole_number_one(ctx)   { return { value: 1 }; }
  whole_number_two(ctx)   { return { value: 2 }; }
  whole_number_three(ctx) { return { value: 3 }; }
  whole_number_four(ctx)  { return { value: 4 }; }
  whole_number_five(ctx)  { return { value: 5 }; }
  whole_number_six(ctx)   { return { value: 6 }; }
  whole_number_seven(ctx) { return { value: 7 }; }
  whole_number_eight(ctx) { return { value: 8 }; }
  whole_number_nine(ctx)  { return { value: 9 }; }

}

const interpreter = new Interpreter(Math.random);

export default interpreter;