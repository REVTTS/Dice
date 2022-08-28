# REVTTS Dice

Dice is a library for rolling dice for Random Encounter Virtual Tabletop Services.

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

## Copyright Notice

Copyright (C) 2022 REVTTS, Ronald M Zielaznicki

## License Notice
This file is part of REVTTS Dice.

REVTTS Dice is free software: you can redistribute it and/or modify it under the terms of
the GNU General Public License as published by the Free Software Foundation, either
version 3 of the License, or any later version.

REVTTS Dice is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with REVTTS Dice.
If not, see <https://www.gnu.org/licenses/>. 
