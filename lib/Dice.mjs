/*!
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
import{createToken as e,Lexer as s,CstParser as t}from"chevrotain";e({name:"bracket_angle_close",pattern:/>/}),e({name:"bracket_angle_open",pattern:/</});const i=e({name:"bracket_curley_close",pattern:/\}/}),r=e({name:"bracket_curley_open",pattern:/\{/}),n=e({name:"bracket_round_close",pattern:/\)/}),o=e({name:"bracket_round_open",pattern:/\(/});e({name:"bracket_square_close",pattern:/\]/}),e({name:"bracket_square_open",pattern:/\[/});const h=e({name:"abs",pattern:/abs/}),_=e({name:"ceil",pattern:/ceil/}),a=e({name:"d",pattern:/[dD]/}),u=e({name:"divide",pattern:/\//}),p=e({name:"dot",pattern:/\./}),l=e({name:"exponent",pattern:/\*\*/}),L=e({name:"floor",pattern:/floor/}),U=e({name:"modulus",pattern:/%/}),E=e({name:"minus",pattern:/-/}),m=e({name:"multiply",pattern:/\*/}),x=e({name:"plus",pattern:/\+/}),b=e({name:"round",pattern:/round/});var d=Object.freeze({__proto__:null,token_operator_absolute:h,token_operator_ceil:_,token_operator_dice:a,token_operator_divide:u,token_operator_dot:p,token_operator_exponent:l,token_operator_floor:L,token_operator_modulus:U,token_operator_minus:E,token_operator_multiply:m,token_operator_plus:x,token_operator_round:b});const v=e({name:"string",pattern:/[a-zA-Z]+/}),c=e({name:"number_zero",pattern:/0/}),R=e({name:"number_one",pattern:/1/}),B=e({name:"number_two",pattern:/2/}),S=e({name:"number_three",pattern:/3/}),A=e({name:"number_four",pattern:/4/}),w=e({name:"number_five",pattern:/5/}),f=e({name:"number_six",pattern:/6/}),M=e({name:"number_seven",pattern:/7/}),O=e({name:"number_eight",pattern:/8/}),g=e({name:"number_nine",pattern:/9/});var N=Object.freeze({__proto__:null,token_number_zero:c,token_number_one:R,token_number_two:B,token_number_three:S,token_number_four:A,token_number_five:w,token_number_six:f,token_number_seven:M,token_number_eight:O,token_number_nine:g});e({name:"whitespace",pattern:/\s/});const k=e({group:s.SKIPPED,name:"whitespace",pattern:/\s/});var C=new s([r,i,n,o,...Object.values(d),...Object.values(N),k,v]);class Parser extends t{constructor(e){super(e),this.RULE("expression",(()=>{this.SUBRULE(this.minus_expression,{LABEL:"expression"})})),this.RULE("absolute_expression",(()=>{this.CONSUME(h),this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})})),this.RULE("addition_expression",(()=>{this.SUBRULE(this.modulus_expression,{LABEL:"left_hand"}),this.MANY((()=>{this.CONSUME(x),this.SUBRULE2(this.modulus_expression,{LABEL:"right_hand"})}))})),this.RULE("atomic_expression",(()=>{this.OR([{ALT:()=>this.SUBRULE(this.absolute_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.ceil_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.floor_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.negative_number_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.round_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.variable_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.whole_number_expression,{LABEL:"expression"})}])})),this.RULE("ceil_expression",(()=>{this.CONSUME(_),this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})})),this.RULE("die_expression",(()=>{this.SUBRULE(this.dot_expression,{LABEL:"left_hand"}),this.MANY((()=>{this.CONSUME(a),this.SUBRULE2(this.dot_expression,{LABEL:"right_hand"})}))})),this.RULE("divide_expression",(()=>{this.SUBRULE(this.multiply_expression,{LABEL:"left_hand"}),this.MANY((()=>{this.CONSUME(u),this.SUBRULE2(this.multiply_expression,{LABEL:"right_hand"})}))})),this.RULE("dot_expression",(()=>{this.OR([{ALT:()=>this.SUBRULE(this.real_number_expression,{LABEL:"expression"})}])})),this.RULE("exponential_expression",(()=>{this.SUBRULE(this.die_expression,{LABEL:"left_hand"}),this.MANY((()=>{this.CONSUME(l),this.SUBRULE2(this.die_expression,{LABEL:"right_hand"})}))})),this.RULE("floor_expression",(()=>{this.CONSUME(L),this.SUBRULE2(this.parenthesis_expression,{LABEL:"expression"})})),this.RULE("minus_expression",(()=>{this.SUBRULE(this.addition_expression,{LABEL:"left_hand"}),this.MANY((()=>{this.CONSUME(E),this.SUBRULE2(this.addition_expression,{LABEL:"right_hand"})}))})),this.RULE("modulus_expression",(()=>{this.SUBRULE(this.divide_expression,{LABEL:"left_hand"}),this.MANY((()=>{this.CONSUME(U),this.SUBRULE2(this.divide_expression,{LABEL:"right_hand"})}))})),this.RULE("multiply_expression",(()=>{this.SUBRULE(this.exponential_expression,{LABEL:"left_hand"}),this.MANY((()=>{this.CONSUME(m),this.SUBRULE2(this.exponential_expression,{LABEL:"right_hand"})}))})),this.RULE("negative_number_expression",(()=>{this.CONSUME(E),this.SUBRULE(this.expression)})),this.RULE("parenthesis_expression",(()=>{this.CONSUME(o),this.SUBRULE(this.expression,{LABEL:"expression"}),this.CONSUME(n)})),this.RULE("real_number_expression",(()=>{this.OR([{ALT:()=>{this.SUBRULE(this.atomic_expression,{LABEL:"left_hand"}),this.OPTION((()=>{this.CONSUME(p),this.SUBRULE2(this.atomic_expression,{LABEL:"right_hand"})}))}},{ALT:()=>{this.CONSUME2(p),this.SUBRULE3(this.atomic_expression,{LABEL:"right_hand"})}}])})),this.RULE("round_expression",(()=>{this.CONSUME(b),this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})})),this.RULE("whole_number_expression",(()=>{this.AT_LEAST_ONE((()=>{this.SUBRULE(this.whole_number)}))})),this.RULE("whole_number",(()=>{this.OR([{ALT:()=>this.SUBRULE(this.whole_number_zero)},{ALT:()=>this.SUBRULE(this.whole_number_one)},{ALT:()=>this.SUBRULE(this.whole_number_two)},{ALT:()=>this.SUBRULE(this.whole_number_three)},{ALT:()=>this.SUBRULE(this.whole_number_four)},{ALT:()=>this.SUBRULE(this.whole_number_five)},{ALT:()=>this.SUBRULE(this.whole_number_six)},{ALT:()=>this.SUBRULE(this.whole_number_seven)},{ALT:()=>this.SUBRULE(this.whole_number_eight)},{ALT:()=>this.SUBRULE(this.whole_number_nine)}])})),this.RULE("whole_number_zero",(()=>{this.CONSUME(c)})),this.RULE("whole_number_one",(()=>{this.CONSUME(R)})),this.RULE("whole_number_two",(()=>{this.CONSUME(B)})),this.RULE("whole_number_three",(()=>{this.CONSUME(S)})),this.RULE("whole_number_four",(()=>{this.CONSUME(A)})),this.RULE("whole_number_five",(()=>{this.CONSUME(w)})),this.RULE("whole_number_six",(()=>{this.CONSUME(f)})),this.RULE("whole_number_seven",(()=>{this.CONSUME(M)})),this.RULE("whole_number_eight",(()=>{this.CONSUME(O)})),this.RULE("whole_number_nine",(()=>{this.CONSUME(g)})),this.RULE("variable_expression",(()=>{this.CONSUME(r),this.CONSUME(v),this.CONSUME(i)})),this.performSelfAnalysis()}}const T=()=>new Parser([r,i,n,o,...Object.values(d),...Object.values(N),v]);const y=T().getBaseCstVisitorConstructorWithDefaults(),z=e=>e.reduce(((e,s)=>e+s)),j=e=>e.reduce(((e,s)=>e/s)),Y=e=>e.reduce(((e,s)=>e**s)),D=e=>e.reduce(((e,s)=>e-s)),I=e=>e.reduce(((e,s)=>e%s)),P=e=>e.reduce(((e,s)=>e*s));function q(e,s,t,i){let r=t(e.left_hand,i);if(e.right_hand){const n=e.right_hand.map((e=>t(e,i))).map((e=>z(e.values)));return{values:[s([z(r.values),...n])]}}return{values:r.values}}class Interpreter extends y{constructor(){super(),this.validateVisitor()}expression(e,s){return this.visit(e.expression,s)}absolute_expression(e,s){return{values:[Math.abs(z(this.visit(e.expression,s).values))]}}addition_expression(e,s){return q(e,z,this.visit.bind(this),s)}atomic_expression(e,s){return this.visit(e.expression,s)}ceil_expression(e,s){return{values:[Math.ceil(z(this.visit(e.expression,s).values))]}}die_expression(e,s){const t=this.visit(e.left_hand,s);if(e.right_hand){const i=e.right_hand.map((e=>this.visit(e,s))).map((e=>z(e.values))).reduce(((e,t)=>{let i=z(e);const r=Math.sign(i)*Math.sign(t);if(0===r)return[0];const n=[];i=Math.abs(i);for(let e=0;e<i;e++)n.push(r*Math.floor(s.prng()*Math.abs(t)+.9999));return n}),t.values);return 0===i.length&&i.push(0),{values:i}}return{values:[z(t.values)]}}divide_expression(e,s){return q(e,j,this.visit.bind(this),s)}dot_expression(e,s){return this.visit(e.expression,s)}exponential_expression(e,s){return q(e,Y,this.visit.bind(this),s)}floor_expression(e,s){return{values:[Math.floor(z(this.visit(e.expression,s).values))]}}minus_expression(e,s){return q(e,D,this.visit.bind(this),s)}modulus_expression(e,s){return q(e,I,this.visit.bind(this),s)}multiply_expression(e,s){return q(e,P,this.visit.bind(this),s)}negative_number_expression(e,s){return{values:[-z(this.visit(e.expression,s).values)]}}parenthesis_expression(e,s){return this.visit(e.expression,s)}real_number_expression(e,s){if(e.right_hand){const t=this.visit(e.right_hand,s),i=t.values.length,r=z(t.values)/10**i;return e.left_hand?{values:[z(this.visit(e.left_hand,s).values)+r]}:{values:[r]}}return this.visit(e.left_hand,s)}round_expression(e,s){return{values:[Math.round(z(this.visit(e.expression,s).values))]}}whole_number_expression(e){let s=[];const t=e.whole_number.length;for(let i in e.whole_number)s.push(this.visit(e.whole_number[i])*10**(t-1-i));return{values:s}}whole_number(e){const s=Object.keys(e)[0];return this.visit(e[s])}whole_number_zero(){return 0}whole_number_one(){return 1}whole_number_two(){return 2}whole_number_three(){return 3}whole_number_four(){return 4}whole_number_five(){return 5}whole_number_six(){return 6}whole_number_seven(){return 7}whole_number_eight(){return 8}whole_number_nine(){return 9}variable_expression(e,s){return{values:[s.variables.get(e.string[0].image)||0]}}}new Interpreter(Math.random);class Dice{constructor(){this.interpreter=new Interpreter,this.parser=T()}roll(e,{prng:s,variables:t}={}){const i=C.tokenize(e);if(i.errors.length>0){const s=i.errors[0].offset;throw new Error(`Unexpected character "${e.charAt(s)}" at position: ${s}`)}s||(s=Math.random),t||(t=[]);const r=new Map;t.forEach((e=>{r.set(e[0].toLowerCase(),e[1])})),this.parser.input=i.tokens;const n=this.parser.expression();return this.interpreter.visit(n,{prng:s,variables:r})}}export{Dice as default};
//# sourceMappingURL=Dice.mjs.map
