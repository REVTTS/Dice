import { Lexer } from 'chevrotain';
import tokens from './tokens';

export const Lexer = Lexer;

export default new Lexer(tokens);