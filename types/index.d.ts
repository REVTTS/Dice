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

export class Dice {
    /**
     * @function roll
     * @param {string} input A string representation of a die.
     * @param {RollOptions} options How to format the image of the RollOutput.
     * @returns {RollOutput} The result of the die being rolled.
     * */
    roll(input: string, { formatter, prng }?: RollOptions): RollOutput;
}

/**
 * The output from a roll
 */
export type RollOutput = {
    /**
     * A string if undefined, but defined by the formatter
     * if provided. Unused at this time.
     */
    image: str | any;
    /**
     * The result of a roll of of the die
     */
    value: number;
};

/**
 * The object that determines the image of the roll.
 *  This is unused right now, it's a placeholder for future improvements.
 */
export type Formatter = any;

export type RollOptions = {
    /**
     * The object that determines the image of the roll.
     * This is unused right now, it's a placeholder for future improvements.
     */
    formatter: Formatter | null;
    /**
     * A function that returns a number between 0 and 1
     * non-inclusive. Default is Math.random.
     */
    prng: Function | null;
};
