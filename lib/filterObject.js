/**
 * Creates a new object with only the specified keys from the source object
 * @param {Object} obj - The source object to filter
 * @param {Array<string>} keys - The keys to include in the resulting object
 * @returns {Object} A new object containing only the specified keys
 */
export default function filterObject(obj, keys) {
	return Object.fromEntries(
		keys.map(k => {
			return [k, obj[k]];
		})
	);
}
