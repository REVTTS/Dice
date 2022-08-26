# REVTTS Dice

Dice is a library for rolling dice for Random Encounter Virtual Tabletop Services.

It's goal is to allow users to roll dice, but to also perform mathematical operations,
mathematical functions, and variable handling.

## Installation

Use [yarn](https://yarnpkg.com/) to install @revtts/dice.

```bash
yarn install @revtts/dice
```

## Usage

```javascript
import Dice from '@revtts/dice';

const dice = new Dice();

// Basic die
const result = dice.roll('1d20');
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
