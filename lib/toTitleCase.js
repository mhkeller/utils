/**
 * Converts a string to title case
 * @param {string} str - The string to convert
 * @returns {string} - The converted string
 */
export default function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		txt => {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}
