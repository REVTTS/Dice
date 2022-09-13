/*
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

import Benchmark from 'benchmark';

import { Dice } from './Dice.js';
const dice = new Dice();

const suite = new Benchmark.Suite;

suite.add('Dice.roll#simple', function() {
  dice.roll('1d20');
}).add('Dice.roll#complex', function() {
  dice.roll('1d20+5/(4/3)+6*3+1d(5+(4-(10+3)))');
}).on('cycle', function(event) {
  console.log(String(event.target));
}).run({ 'async': false });
