
import { createToken } from "chevrotain";

export const number_zero = createToken({
  name: 'number_zero',
  pattern: /0/,
});

export const number_one = createToken({
  name: 'number_one',
  pattern: /1/,
});

export const number_two = createToken({
  name: 'number_two',
  pattern: /2/,
});

export const number_three = createToken({
  name: 'number_three',
  pattern: /3/,
});

export const number_four = createToken({
  name: 'number_four',
  pattern: /4/,
});

export const number_five = createToken({
  name: 'number_five',
  pattern: /5/,
});

export const number_six = createToken({
  name: 'number_six',
  pattern: /6/,
});

export const number_seven = createToken({
  name: 'number_seven',
  pattern: /7/,
});

export const number_eight = createToken({
  name: 'number_eight',
  pattern: /8/,
});

export const number_nine = createToken({
  name: 'number_nine',
  pattern: /9/,
});

export default {
  number_zero,
  number_one,
  number_two,
  number_three,
  number_four,
  number_five,
  number_six,
  number_seven,
  number_eight,
  number_nine,
}