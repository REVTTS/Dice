# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- [`#1`](https://github.com/REVTTS/Dice/issues/1) - a precommit hook
- [`#2`](https://github.com/REVTTS/Dice/issues/2) - a roadmap to the readme
- [`#2`](https://github.com/REVTTS/Dice/issues/2) - labels to the roadmap
- [`#2`](https://github.com/REVTTS/Dice/issues/2) - arbitrary dice to the roadmap
- [`#2`](https://github.com/REVTTS/Dice/issues/2) - conditionals to the roadmap
- [`#4`](https://github.com/REVTTS/Dice/issues/4) - fix multi-digit real numbers

### Changed
- [`#2`](https://github.com/REVTTS/Dice/issues/2) - moved odd dice to after version 1.0.0

## [0.0.5] - 2022-08-28

### Changed
- exports of package.json to proper distributions
- main of package.json to `./dist/Dice.mjs`

### Removed
- `/dist` from .gitignore
- `/lib` from .gitignore

## [0.0.4] - 2022-08-28

### Added
- pretest script to package.json
- prepare script to package.json
- Linting
- Rollup builds

### Removed
- Seedrandom as default prng
- Webpack builds

## [0.0.2] - 2022-08-27

### Added

#### Number Comprehension
- Negative numbers `Dice.roll('-1')`
- Real numbers `Dice.roll('0.1')`
- Whole numbers `Dice.roll('1')`

#### Algebra
- Addition `Dice.roll('1+1')`
- Exponents `Dice.roll('5**2')`
- Division `Dice.roll('10/2')`
- Modulus `Dice.roll('5%2')`
- Multiplication `Dice.roll('2*2')`
- Parenthesis `Dice.roll('4/(3-1)')`
- Subtraction `Dice.roll('1-1')`

#### Math Functions
- Absolute `Dice.roll('abs(-4)')`
- Ceiling `Dice.roll('ceil(2.5)')`
- Floor `Dice.roll('floor(2.5)')`
- Round `Dice.roll('round(2.5)')`

#### Dice
- Basic die `Dice.roll('1d10')`

## Copyright
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
