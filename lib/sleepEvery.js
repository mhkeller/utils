import sleep from './sleep.js';

/**
 * Sleep for a given amount of milliseconds every n-times
 * @param {number} n - Every n-times
 * @param {number} ms - Milliseconds to sleep
 * @param {number} i - Current iteration
 * @param {object} [options] - Options object
 * @param {boolean} [options.log=true] - Whether to log to console
 * @param {number} [options.indent] - How many tabs to indent the notification by
 * @param {number} [options.jitter=0] - A random percentage of this value in milliseconds to the sleep time
 * @returns {Promise<boolean>} - Promise that resolves to true when complete
 */
export default async function sleepEvery(n, ms, i, options) {
	if (i % n === 0) {
		return sleep(ms, options);
	}
	return true;
}
