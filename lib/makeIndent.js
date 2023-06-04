/**
 * Returns the given number of tabs
 * @param {number} indent
 * @returns {string}
 */
export default function makeIndent (indent) {
	return Array(indent).fill('\t').join('');
}
