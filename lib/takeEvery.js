/**
 * Take every nth element from a list, approximately dividing the list into n chunks
 * @param {Array<any>} list - The input array
 * @param {number} n - The target number of elements to return
 * @returns {Array<any>} - A new array with approximately n elements taken at regular intervals
 */
export default function takeEvery(list, n) {
	if (list.length <= n) return list;
	const e = Math.round(list.length / n);
	return list.filter((d, i) => {
		return i % e === 0;
	});
}
