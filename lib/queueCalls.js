import pLimit from 'p-limit';

/**
 * Queue calls to a function with a concurrency limit.
 * @param {Function} fn - The function to call.
 * @param {Array} items - The parameters to pass to the function.
 * @param {Number} [concurrency=Infinity] - The maximum number of concurrent calls.
 * @returns {Promise} A promise that resolves when all calls have completed.
 * @example
 * const items = [1, 2, 3, 4, 5];
 * const fn = async (item, index, total) => {
 *  console.log(`Calling ${item} (${index} of ${total})`);
 *  await new Promise(resolve => setTimeout(resolve, 1000));
 *  console.log(`Called ${item} (${index} of ${total})`);
 *  return item * 2;
 * };
 * const results = await queueCalls(fn, items, 2);
 * console.log(results);
 */
export default async function queueCalls(items, fn, concurrency = Infinity) {
	const limit = pLimit(concurrency);
	const calls = items.map((d, i) => {
		return limit(() => fn(d, i + 1, items.length));
	});
	return Promise.all(calls);
};
