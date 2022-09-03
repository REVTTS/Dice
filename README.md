# REVTTS Dice

Dice is a library for turning string representations of a die roll into the die roll itself.

It's goal is to allow users to roll dice, but to also perform mathematical operations,
mathematical functions, and variable handling.

## Installation

```bash
yarn install @revtts/dice

yarn setup
```

## Usage

```javascript
import Dice from '@revtts/dice';

// Our pseudo random number generator isn't very random.
// Every die roll will end up the same, but it's enough
// to showcase the library.
const dice = new Dice(() => 0.1);

/* dice */
const result = dice.roll('1d20'); // { value: 2 }

/* math */

// Addition
const result = dice.roll('1+2'); // { value: 3 }

// Subtraction
const result = dice.roll('10-2'); // { value: 8 }

// Multiplication
const result = dice.roll('5*5'); // { value: 25 }

// Exponents
const result = dice.roll('3**3'); // { value: 9 }

/* mathematical functions */

// Absolute value
const result = dice.roll('abs(-1)'); // { value: 1 }

// Ceiling of a value
const result = dice.roll('ciel(1.7)'); // { value: 2 }

// Floor of a value
const result = dice.roll('floor(1.7)'); // { value: 1 }

// Round a value
const result = dice.roll('floor(2.5)'); // { value: 3 }

```

## Roadmap

### [1.0.0]

- [ ] Formatter
  - A class that a consume of the library can extend to augment the output of a rolled
  dice.
- [x] Die variables - A mapping of keys to values that can be passed to Dice.roll().
  - example:
    - input: `2+{strength}`
    - mapping: `[[ "strength", 5 ]]`
    - output: `4`
- [ ] Die
  - [x] Alternative Format
    - `1.die(20)` - one twenty sided die
    - `1.die(5)` - ten five sided dice
  - [ ] Fate Dice
    - A regular Fate die has 2 `+`, 2 `-` and 2 blanks on it.
    - `2df` - roll two regular fate dice.
    - `2.fate_die`
    - [ ] Variants
      - `2dfv` - Default varaint die, 4 blanks, 1 `+`, and 1 `-`
      - `2df4,1,1` - same as above
      - `2.variant_fate_die` - same as above
      - `2.fate_die(4, 1, 1)` - same as above
  - [ ] Percent Dice
    - `1d%` - basically a 1d100
    - `1.percent_die` 
- [ ] Die Modifiers / Functions
  - [ ] Comparison
      - [ ] equal to
        - `5=5` => `True`
        - `5.is_equal(5)` => `True`
        - `4=5` => `False`
      - [ ] greater than
        - `6>5` => `True`
        - `6.is_greater_than(5)` => `True`
        - `4>5` => `False`
      - [ ] less than
        - `5<6` => `True`
        - `5.is_less_than(6)` => `True`
        - `4>5` => `False`
      - [ ] not equal
        - `3<>5` => `True`
        - `3.is_not_equal(5)` => `True`
        - `5<>5` => `False`
    - Context based:
      - For instance, will act differently on exploding or rerolled dice.
      - [ ] equal to
        - `10d20!=5` - explodes on five
        - `10d20.explodes.equal(5)`
      - [ ] greater than
        - `10d20!>5` - explodes when greater than five
        - `10d20.explodes.greater_than(5)`
      - [ ] less than
        - `10d20!<5` - explodes when less than five
        - `10d20.explodes.less_than(,5)`
      - [ ] not equal
        - `10d20!<>5` - explodes when not five
        - `10d20.explodes.not_equal(5)`
  - [ ] Conditional expressions
    - `if 5=5 [expression]`
    - `if 5=5 [expression] else `[other_expression]`
    - Possibly case statements?
  - [ ] Critical Failures
    - `1d20cf<3` - Fails on less than 3
    - `1d20.critical_failure.less_than(3)` - same as above
    - [ ] Context based Comparisons
  - [ ] Critical Success
    - `1d20cs>18` - Crits when greater than 18
    - `1d20.critical_success.greater_than(18)` - same as above
    - [ ] Context based Comparisons
  - [ ] Drop Highest
    - `10d20dh3` - Drops highest three rolls
    - `10d20.drop_highest(3)` 
  - [ ] Drop Lowest
    - `10d20dl3` - Drops lowest three rolls
    - `10d20.drop_lowest(3)` 
  - [ ] Explodes
    - `10d20!`
    - `10d20.explodes`
    - [ ] Context based Comparisons
    - [ ] limits
      - [ ] default - 10 per initial die?
        - config?
      - [ ] infinites - block infinite explosions
  - [ ] Keep Highest
    - `10d20kh1`
    - `10d20.keep_highest(1)`
  - [ ] Keep Lowest
    - `10d20kl1`
    - `10d20.keep_lowest(1)`
  - [ ] Labels - Tell us what this die, number, or whatever is.
    - `5#"Strength"`
    - `5.label("Strength")`
  - [ ] Max
    - `10d20max3`
    - `10d20.max(3)`
  - [ ] Min
    - `10d20min3`
    - `10d20.min(3)`
  - [ ] Re-roll
    - `1d20r1` - rerolls once, this is a divergence from the popular style.
    - `1d20r` - defaults to rerolling min value of die.
    - `1d20.reroll(1)`
    - [ ] Context based Comparisons
    - [ ] limits
      - [ ] default - 10 per initial die?
        - config?
      - [ ] infinites - block infinite rerolls
  - [ ] Sorting
    - [ ] Ascending
      - `10d20sa`
      - `10d20.sort_ascending`
    - [ ] Descending
      - `10d20sd`
      - `10d20.sort_descending`
  - [ ] Target Successes & Failures
    - Needs more evaulation
    - Use with comparisons


### [beyond-1.0.0]
- [ ] Dice
  - [ ] arbitrary Dice
    - `1ad5,7,8,10` - a die that results in either a 5, 7, 8, or 10.
    - `arbitrary_die(1, 5, 7, 8, 10)` - same as above
  - [ ] Odd Dice
    - `1od3,12` - a die that rolls a value from 3 to 12 inclusive
    - `odd_die(1, 3, 12)` - same as above

## Contributing
This repository follows the standards set in
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [semver](https://semver.org/)

## Copyright
Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

## License
[GPL-3.0-or-later](https://www.gnu.org/licenses/gpl-3.0.html)
