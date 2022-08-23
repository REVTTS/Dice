import parser from './parser.js';

const BaseSQLVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

export class Interpreter extends BaseSQLVisitor {
  constructor() {
    super()
    this.validateVisitor()
  }

  expression(ctx) {
    return this.visit(ctx.die_expression);
  }

  die_expression(ctx) {
    console.log(ctx);
  }


}

const interpreter = new Interpreter();

export default interpreter;