/**
 * Round a number to a specified number of decimal places
 * @param {number} num - Number to round
 * @param {number} [dec=1] - Number of decimal places to round to
 * @returns {number} - The rounded number
 */
export default function roundDecimel(num, dec = 1) {
	const f = 10 ** dec;
	return Math.round(num * f) / f;
}
