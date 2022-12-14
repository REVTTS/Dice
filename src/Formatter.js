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

export class Formatter {
  constructor() {}

  /**
   * The default format for any result.
   * 
   * @param {String} value
   * @returns String
   */
  format_result(value) {
    return value;
  }

  /**
   * The default format for a range of results
   * 
   * @param {Array<Strings>} values 
   * @returns String
   */
  format_results(values) {
    if (values.length > 1) {
      return `[${values.join(', ')}]`;
    }
    return values.join(',');
  }
}