import parser from './parser.js';

const BaseSQLVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

export class Interpreter extends BaseSQLVisitor {
  constructor(prng) {
    super()

    this.prng = prng;
    this.validateVisitor()
  }

  expression(ctx) {
    return this.visit(ctx.minus_expression);
  }

  addition_expression(ctx) {
    let return_value = this.visit(ctx.left_hand);

    if (ctx.right_hand)
      ctx.right_hand.forEach((operand) => {
        return_value += this.visit(operand);
      });

    return return_value;
  }

  minus_expression(ctx) {
    let return_value = this.visit(ctx.left_hand);

    if (ctx.right_hand)
      ctx.right_hand.forEach((operand) => {
        return_value -= this.visit(operand);
      });

    return return_value;
  }

  modulus_expression(ctx) {
    let return_value = this.visit(ctx.left_hand);

    if (ctx.right_hand)
      ctx.right_hand.forEach((operand) => {
        return_value %= this.visit(operand);
      });

    return return_value;
  }

  divide_expression(ctx) {
    let return_value = this.visit(ctx.left_hand);

    if (ctx.right_hand)
      ctx.right_hand.forEach((operand) => {
        return_value /= this.visit(operand);
      });

    return return_value;
  }

  multiply_expression(ctx) {
    let return_value = this.visit(ctx.left_hand);

    if (ctx.right_hand)
      ctx.right_hand.forEach((operand) => {
        return_value *= this.visit(operand);
      });

    return return_value;
  }

  exponential_expression(ctx) {
    let return_value = this.visit(ctx.left_hand);

    if (ctx.right_hand)
      ctx.right_hand.forEach((operand) => {
        return_value **= this.visit(operand);
      });

    return return_value;
  }

  die_expression(ctx) {
    if (ctx.d) {
      const num_die = this.visit(ctx.left_hand);
      let die_size = 0;
      let return_value = 0;
    
      ctx.right_hand.forEach((operand) => {
        die_size += this.visit(operand);
      });
    
      for (let i = 0; i < num_die; i++) {
        return_value += Math.floor((this.prng() * die_size)) + 1;
      }
  
      return return_value; 
    } else
      return this.visit(ctx.left_hand);
  }

  atomic_expression(ctx) {
    return this.visit(ctx.atomic_expression);
  }

  absolute_expression(ctx) {
    return Math.abs(this.visit(ctx.inner_expression));
  }

  ceil_expression(ctx) {
    return Math.ceil(this.visit(ctx.inner_expression));
  }

  floor_expression(ctx) {
    return Math.floor(this.visit(ctx.inner_expression));
  }

  negative_expression(ctx) {
    return -this.visit(ctx.inner_expression);
  }

  round_expression(ctx) {
    return Math.round(this.visit(ctx.inner_expression));
  }

  parenthesis_expression(ctx) {
    return this.visit(ctx.inner_expression);
  }

  real_number_expression(ctx) {
    const left_hand_value = this.visit(ctx.left_hand);

    if (ctx.dot) {
      const right_hand_value = this.visit(ctx.right_hand);
      const num_digits = Math.ceil(Math.log10(right_hand_value+1));

      return left_hand_value + (right_hand_value / 10 * num_digits);
    }
    return left_hand_value
  }

  whole_number_expression(ctx) {
    let value = 0;
    for (let whole_number of ctx.whole_number) {
      value = (value * 10) + this.visit(whole_number);
    }
    return value;
  }

  whole_number(ctx) {
    const key = Object.keys(ctx)[0]
    return this.visit(ctx[key]);
  }

  whole_number_zero(ctx)  { return 0; }
  whole_number_one(ctx)   { return 1; }
  whole_number_two(ctx)   { return 2; }
  whole_number_three(ctx) { return 3; }
  whole_number_four(ctx)  { return 4; }
  whole_number_five(ctx)  { return 5; }
  whole_number_six(ctx)   { return 6; }
  whole_number_seven(ctx) { return 7; }
  whole_number_eight(ctx) { return 8; }
  whole_number_nine(ctx)  { return 9; }

}

const interpreter = new Interpreter(Math.random);

export default interpreter;