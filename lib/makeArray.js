/**
 * Make an array of n elements
 * @param {number} n - The number of elements
 * @returns {Array<undefined>} - An array of n undefined elements
 */
export default function makeArray(n) {
	return Array.from(Array(n));
}
