export class Formatter {
  constructor() {}

  /**
   * Formats an individual result from rolled dice.
   * 
   * @param {String} input 
   * @returns String
   */
  format_dice_result(input) {
    return this.format_result(input);
  }

  /**
   * The default format for any result.
   * 
   * @param {String} input 
   * @returns String
   */
  format_result(input) {
    return input;
  }
}