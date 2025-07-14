import sleep from './sleep.js';

/**
 * Sleep for a given amount of milliseconds every n-times
 * @param {number} n - Every n-times (must be > 0)
 * @param {number} ms - Milliseconds to sleep
 * @param {number} i - Current iteration (0-based)
 * @param {object} [options] - Options object
 * @param {boolean} [options.log=true] - Whether to log to console
 * @param {number} [options.indent] - How many tabs to indent the notification by
 * @param {number} [options.jitter=0] - A random percentage of this value in milliseconds to the sleep time
 * @returns {Promise<void>} - Promise that resolves when complete
 */
export default async function sleepEvery(n, ms, i, options) {
	// Validate inputs
	if (n <= 0 || !Number.isInteger(n)) {
		throw new Error('n must be a positive integer');
	}

	// Sleep every n iterations, but skip the first iteration (i=0)
	if (i > 0 && i % n === 0) {
		await sleep(ms, options);
	}
}
