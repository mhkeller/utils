/**
 * Pad a string or number with leading zeros
 * @param {string|number} value The value to pad
 * @param {number} pb How many characters the resulting string should have
 * @returns {string} The padded string
 */
export default function padBy(value, pb = 2) {
	return String(value).padStart(pb, '0');
}
