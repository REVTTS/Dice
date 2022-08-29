# REVTTS Dice

Dice is a library for turning string representations of a die roll into the die roll itself.

It's goal is to allow users to roll dice, but to also perform mathematical operations,
mathematical functions, and variable handling.

## Installation

```bash
yarn install @revtts/dice
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
- [ ] Die variables - A mapping of keys to values that can be passed to Dice.roll().
  - example:
    - input: `2+${strength}`
    - mapping: `{ "strength": 5 }`
    - output: `4`
- [ ] Die
  - [ ] Alternative Format
    - `die(1, 20)` - one twenty sided die
    - `die(10, 5)` - ten five sided dice
  - [ ] Dice that don't start at one
    - `1d3,12` - a die that rolls a value from 3 to 12 inclusive
    - `die(1, 3, 12)`
  - [ ] Fate Dice
    - A regular Fate die has 2 `+`, 2 `-` and 2 blanks on it.
    - `2df` - roll two regular fate dice.
    - `fate_die(2)`
    - [ ] Variants
      - `2dfv` - Default varaint die, 4 blanks, 1 `+`, and 1 `-`
      - `2df4,1,1` - same as above
      - `variant_fate_die(2)` - same as above
      - `fate_die(2, 4, 1, 1)` - same as above
  - [ ] Percent Dice
    - `1d%` - basically a 1d100
    - `percent_die(1)` 
- [ ] Die Modifiers / Functions
  - [ ] Comparison
      - [ ] equal to
        - `5=5` => `True`
        - `equal(5, 5)` => `True`
        - `4=5` => `False`
      - [ ] greater than
        - `6>5` => `True`
        - `greater_than(6, 5)` => `True`
        - `4>5` => `False`
      - [ ] less than
        - `5<6` => `True`
        - `less_than(5, 6)` => `True`
        - `4>5` => `False`
      - [ ] not equal
        - `3<>5` => `True`
        - `not_equal(3, 5)` => `True`
        - `5<>5` => `False`
    - Context based:
      - For instance, will act differently on exploding or rerolled dice.
      - [ ] equal to
        - `10d20!=5` - explodes on five
        - `equal(explodes(10d20), 5)`
      - [ ] greater than
        - `10d20!>5` - explodes when greater than five
        - `greater_than(explodes(10d20), 5)`
      - [ ] less than
        - `10d20!<5` - explodes when less than five
        - `less_than(explodes(10d20), 5)`
      - [ ] not equal
        - `10d20!<>5` - explodes when not five
        - `not_equal(explodes(10d20), 5)`
  - [ ] Critical Failures
    - `1d20cf<3` - Fails on less than 3
    - `less_than(critical_failure(1d20), 3)` - same as above
    - [ ] Context based Comparisons
  - [ ] Critical Success
    - `1d20cs>18` - Crits when greater than 18
    - `greater_than(critical_success(1d20), 18)` - same as above
    - [ ] Context based Comparisons
  - [ ] Drop Highest
    - `10d20dh3` - Drops highest three rolls
    - `drop_highest(10d20, 3)` 
  - [ ] Drop Lowest
    - `10d20dl3` - Drops lowest three rolls
    - `drop_lowest(10d20, 3)` 
  - [ ] Explodes
    - `10d20!`
    - `explodes(10d20)`
    - [ ] Context based Comparisons
    - [ ] limits
      - [ ] default - 10 per initial die?
        - config?
      - [ ] infinites - block infinite explosions
  - [ ] Max
    - `10d20max3`
    - `max(10d20, 3)`
  - [ ] Min
    - `10d20min3`
    - `min(10d20, 3)`
  - [ ] Keep Highest
    - `10d20kh1`
    - `keep_highest(10d20, 1)`
  - [ ] Keep Lowest
    - `10d20kl1`
    - `keep_lowest(10d20, 1)`
  - [ ] Re-roll
    - `1d20r1` - rerolls once, this is a divergence from the popular style.
    - `1d20r` - defaults to rerolling min value of die.
    - `reroll(1d20, 1)`
    - [ ] Context based Comparisons
    - [ ] limits
      - [ ] default - 10 per initial die?
        - config?
      - [ ] infinites - block infinite rerolls
  - [ ] Sorting
    - [ ] Ascending
      - `10d20sa`
      - `sort_ascending(10d20)`
    - [ ] Descending
      - `10d20sd`
      - `sort_descending(10d20)`
  - [ ] Target Successes & Failures
    - Needs more evaulation
    - Use with comparisons

## Contributing
This repository follows the standards set in
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [semver](https://semver.org/)

## Copyright
Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

## License
[GPL-3.0-or-later](https://www.gnu.org/licenses/gpl-3.0.html)
