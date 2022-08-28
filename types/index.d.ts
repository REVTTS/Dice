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
