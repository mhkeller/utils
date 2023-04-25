/**
 * Take every nth element from a list
 * @param {Array} list
 * @param {number} n
 * @returns {Array} - A new array with every nth element
 */
export default function takeEvery(list, n) {
	if (list.length <= n) return list;
	const e = Math.round(list.length / n);
	return list.filter((d, i) => {
		return i % e === 0;
	});
}
