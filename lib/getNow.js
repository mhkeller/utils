/**
 * Returns the current date and time as a string.
 * @returns {string} The current date and time as a string
 */
export default function getNow() {
	const d = new Date();
	return d.toISOString().replaceAll(':', '-');
}
