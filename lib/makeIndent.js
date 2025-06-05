/**
 * Returns the given number of tabs
 * @param {number} indent - The number of tabs to create
 * @returns {string} - A string with the specified number of tabs
 */
export default function makeIndent(indent) {
	return '\t'.repeat(indent);
}
