/**
 * Creates a Map lookup from an array of objects
 * @param {Array<Object>} list - The array of objects to create a lookup from
 * @param {string} key - The key in each object to use as the Map key
 * @returns {Map<any, Object>} A Map where the keys are the values of the specified property and the values are the original objects
 */
export default function createLookup(list, key) {
	return new Map(
		list.map(d => {
			return [d[key], d];
		})
	);
}
