import notify from '@mhkeller/notify';

/**
 * Create a function to wait for a specified amount of time on a page
 * @param {import('playwright').Page} page - The puppeteer or playwright page object
 * @returns {Function} A function that waits for a specified amount of time
 */
export default function wait(page) {
	/**
	 * Wait for the specified time
	 * @param {number} ms - The number of milliseconds to wait
	 * @param {string} [msg=''] - Optional message to display while waiting
	 * @returns {Promise<void>} - Promise that resolves when waiting is complete
	 */
	return async function waitFor(ms, msg = '') {
		notify({ m: 'Waiting...', v: `${ms / 1_000}s ${msg}`, d: ['gray', 'italic'] });
		return page.waitForTimeout(ms);
	};
}
