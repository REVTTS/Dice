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

## Contributing
This repository follows the standards set in [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [semver](https://semver.org/)

## Copyright
Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

## License
[GPL-3.0-or-later](https://www.gnu.org/licenses/gpl-3.0.html)
