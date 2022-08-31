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
import{createToken as e,Lexer as s,CstParser as t}from"chevrotain";e({name:"bracket_angle_close",pattern:/>/}),e({name:"bracket_angle_open",pattern:/</}),e({name:"bracket_curley_close",pattern:/\}/}),e({name:"bracket_curley_open",pattern:/\{/});const i=e({name:"bracket_round_close",pattern:/\)/}),r=e({name:"bracket_round_open",pattern:/\(/});e({name:"bracket_square_close",pattern:/\]/}),e({name:"bracket_square_open",pattern:/\[/});const n=e({name:"abs",pattern:/abs/}),o=e({name:"ceil",pattern:/ceil/}),h=e({name:"d",pattern:/[dD]/}),a=e({name:"divide",pattern:/\//}),u=e({name:"dot",pattern:/\./}),p=e({name:"exponent",pattern:/\*\*/}),l=e({name:"floor",pattern:/floor/}),_=e({name:"modulus",pattern:/%/}),L=e({name:"minus",pattern:/-/}),U=e({name:"multiply",pattern:/\*/}),E=e({name:"plus",pattern:/\+/}),x=e({name:"round",pattern:/round/}),m=e({name:"number_zero",pattern:/0/}),v=e({name:"number_one",pattern:/1/}),B=e({name:"number_two",pattern:/2/}),R=e({name:"number_three",pattern:/3/}),b=e({name:"number_four",pattern:/4/}),c=e({name:"number_five",pattern:/5/}),S=e({name:"number_six",pattern:/6/}),A=e({name:"number_seven",pattern:/7/}),w=e({name:"number_eight",pattern:/8/}),d=e({name:"number_nine",pattern:/9/});e({name:"whitespace",pattern:/\s/});const M=e({group:s.SKIPPED,name:"whitespace",pattern:/\s/});var f=new s({modes:{dice_mode:[i,r,n,o,h,a,u,p,l,L,_,U,E,x,m,v,B,R,b,c,S,A,w,d,M]},defaultMode:"dice_mode"});class Parser extends t{constructor(e){super(e),this.RULE("expressions",(()=>{this.MANY((()=>{this.SUBRULE(this.expression,{LABEL:"expressions"})}))})),this.RULE("expression",(()=>{this.OR([{ALT:()=>this.SUBRULE(this.whole_number_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.real_number_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.absolute_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.ceil_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.floor_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.round_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.die_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.exponential_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.multiply_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.divide_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.modulus_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.addition_expression,{LABEL:"expression"})},{ALT:()=>this.SUBRULE(this.minus_expression,{LABEL:"expression"})}])})),this.RULE("absolute_expression",(()=>{this.CONSUME(n),this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})})),this.RULE("addition_expression",(()=>{this.CONSUME(E),this.SUBRULE(this.expression,{LABEL:"expression"})})),this.RULE("ceil_expression",(()=>{this.CONSUME(o),this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})})),this.RULE("die_expression",(()=>{this.CONSUME(h),this.SUBRULE(this.expression,{LABEL:"expression"})})),this.RULE("divide_expression",(()=>{this.CONSUME(a),this.SUBRULE(this.expression,{LABEL:"expression"})})),this.RULE("exponential_expression",(()=>{this.CONSUME(p),this.SUBRULE(this.expression,{LABEL:"expression"})})),this.RULE("floor_expression",(()=>{this.CONSUME(l),this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})})),this.RULE("minus_expression",(()=>{this.CONSUME(L),this.SUBRULE(this.expression,{LABEL:"expression"})})),this.RULE("modulus_expression",(()=>{this.CONSUME(_),this.SUBRULE(this.expression,{LABEL:"expression"})})),this.RULE("multiply_expression",(()=>{this.CONSUME(U),this.SUBRULE(this.expression,{LABEL:"expression"})})),this.RULE("parenthesis_expression",(()=>{this.CONSUME(r),this.SUBRULE(this.expressions,{LABEL:"expression"}),this.CONSUME(i)})),this.RULE("real_number_expression",(()=>{this.CONSUME(u),this.SUBRULE(this.expression,{LABEL:"expression"})})),this.RULE("round_expression",(()=>{this.CONSUME(x),this.SUBRULE(this.parenthesis_expression,{LABEL:"expression"})})),this.RULE("whole_number_expression",(()=>{this.AT_LEAST_ONE((()=>{this.SUBRULE(this.whole_number)}))})),this.RULE("whole_number",(()=>{this.OR([{ALT:()=>this.SUBRULE(this.whole_number_zero)},{ALT:()=>this.SUBRULE(this.whole_number_one)},{ALT:()=>this.SUBRULE(this.whole_number_two)},{ALT:()=>this.SUBRULE(this.whole_number_three)},{ALT:()=>this.SUBRULE(this.whole_number_four)},{ALT:()=>this.SUBRULE(this.whole_number_five)},{ALT:()=>this.SUBRULE(this.whole_number_six)},{ALT:()=>this.SUBRULE(this.whole_number_seven)},{ALT:()=>this.SUBRULE(this.whole_number_eight)},{ALT:()=>this.SUBRULE(this.whole_number_nine)}])})),this.RULE("whole_number_zero",(()=>{this.CONSUME(m)})),this.RULE("whole_number_one",(()=>{this.CONSUME(v)})),this.RULE("whole_number_two",(()=>{this.CONSUME(B)})),this.RULE("whole_number_three",(()=>{this.CONSUME(R)})),this.RULE("whole_number_four",(()=>{this.CONSUME(b)})),this.RULE("whole_number_five",(()=>{this.CONSUME(c)})),this.RULE("whole_number_six",(()=>{this.CONSUME(S)})),this.RULE("whole_number_seven",(()=>{this.CONSUME(A)})),this.RULE("whole_number_eight",(()=>{this.CONSUME(w)})),this.RULE("whole_number_nine",(()=>{this.CONSUME(d)})),this.performSelfAnalysis()}}const O=()=>new Parser([i,r,n,o,h,a,u,p,l,L,_,U,E,x,m,v,B,R,b,c,S,A,w,d]);const C=O().getBaseCstVisitorConstructorWithDefaults(),N=e=>e.reduce(((e,s)=>e+s),0);class Interpreter extends C{constructor(e){super(),this.prng=e,this.validateVisitor()}expressions(e){let s={values:[]};if(e.expressions){for(let t of e.expressions)s=this.visit(t,s);return s}return s}expression(e,s){return this.visit(e.expression,s)}absolute_expression(e){const s=this.visit(e.expression);return{values:[Math.abs(N(s.values))]}}addition_expression(e,s){const t=this.visit(e.expression);return s?{values:[N(s.values)+N(t.values)]}:{values:[N(t.values)]}}ceil_expression(e){const s=this.visit(e.expression);return{values:[Math.ceil(N(s.values))]}}die_expression(e,s){const t=this.visit(e.expression);let i=[];const r=N(s.values),n=N(t.values);for(let e=0;e<r;e++)i.push(Math.floor(this.prng()*n)+1);return{values:i}}divide_expression(e,s){const t=this.visit(e.expression);return{values:[N(s.values)/N(t.values)]}}exponential_expression(e,s){const t=this.visit(e.expression);return{values:[N(s.values)**N(t.values)]}}floor_expression(e){const s=this.visit(e.expression);return{values:[Math.floor(N(s.values))]}}minus_expression(e,s){const t=this.visit(e.expression);return s?{values:[N(s.values)-N(t.values)]}:{values:[-N(t.values)]}}modulus_expression(e,s){const t=this.visit(e.expression);return{values:[N(s.values)%N(t.values)]}}multiply_expression(e,s){const t=this.visit(e.expression);return{values:[N(s.values)*N(t.values)]}}parenthesis_expression(e){return{values:this.visit(e.expression).values}}real_number_expression(e,s){const t=this.visit(e.expression),i=t.values.length,r=N(t.values)/10**i;return s?{values:[N(s.values)+r]}:{values:[r]}}round_expression(e){const s=this.visit(e.expression);return{values:[Math.round(N(s.values))]}}whole_number_expression(e){let s=[];const t=e.whole_number.length;for(let i in e.whole_number){const r=this.visit(e.whole_number[i]);s.push(r.values[0]*10**(t-1-i))}return{values:s}}whole_number(e){const s=Object.keys(e)[0];return this.visit(e[s])}whole_number_zero(){return{values:[0]}}whole_number_one(){return{values:[1]}}whole_number_two(){return{values:[2]}}whole_number_three(){return{values:[3]}}whole_number_four(){return{values:[4]}}whole_number_five(){return{values:[5]}}whole_number_six(){return{values:[6]}}whole_number_seven(){return{values:[7]}}whole_number_eight(){return{values:[8]}}whole_number_nine(){return{values:[9]}}}new Interpreter(Math.random);class Dice{constructor(){this.parser=O()}roll(e,{prng:s}={}){const t=f.tokenize(e);if(t.errors.length>0){const s=t.errors[0].offset;throw new Error(`Unexpected character "${e.charAt(s)}" at position: ${s}`)}s||(s=Math.random),this.parser.input=t.tokens;const i=this.parser.expressions();return new Interpreter(s).visit(i)}}export{Dice as default};
//# sourceMappingURL=Dice.mjs.map
