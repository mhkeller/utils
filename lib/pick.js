/**
 * Creates a new object with only the specified keys from the source object
 * @param {Record<string, any>} obj - The source object to filter
 * @param {Array<string>} keys - The keys to include in the resulting object
 * @returns {Record<string, any>} A new object containing only the specified keys
 */
export default function pick(obj, keys) {
	return Object.fromEntries(
		keys.map(k => {
			return [k, obj[k]];
		})
	);
}
