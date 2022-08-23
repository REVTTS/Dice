import parser from './parser.js';

const BaseSQLVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

export class Interpreter extends BaseSQLVisitor {
  constructor(prng) {
    super()

    this.prng = prng;
    this.validateVisitor()
  }

  expression(ctx) {
    return this.visit(ctx.die_expression);
  }

  die_expression(ctx) {
    const num_die = this.visit(ctx.num_die);
    const die_size = this.visit(ctx.die_size);

    let value = 0;

    for (let i = 0; i < num_die; i++) {
      value += Math.floor((this.prng() * die_size)) + 1;
    }

    return value; 
  }

  integer_expression(ctx) {
    let value = 0;
    for (let integer of ctx.integer) {
      value = (value * 10) + this.visit(integer);
    }
    return value;
  }

  integer(ctx) {
    const key = Object.keys(ctx)[0]
    return this.visit(ctx[key]);
  }

  integer_zero(ctx)  { return 0; }
  integer_one(ctx)   { return 1; }
  integer_two(ctx)   { return 2; }
  integer_three(ctx) { return 3; }
  integer_four(ctx)  { return 4; }
  integer_five(ctx)  { return 5; }
  integer_six(ctx)   { return 6; }
  integer_seven(ctx) { return 7; }
  integer_eight(ctx) { return 8; }
  integer_nine(ctx)  { return 9; }

}

const interpreter = new Interpreter(Math.random);

export default interpreter;