import { format } from 'd3-format';

const commas = format(',');

/**
 * Add commas to a number
 * @param {number} number The number to format
 * @returns {string} The formatted number with commas
 */
export default commas;
