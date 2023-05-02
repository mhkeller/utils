import notify from '@mhkeller/notify';

/**
 * Wait for a specified amount of time
 * @param {Object} page The puppeteer or playwright page object
 * @returns {Function} A function that waits for a specified amount of time
 */
export default function wait(page) {
	/**
	 * @param {number} ms - The number of milliseconds to wait
	 */
	return async function waitFor (ms, msg = '') {
		notify({ m: 'Waiting...', v: `${ms / 1_000}s ${msg}`, d: ['gray', 'italic'] });
		return page.waitForTimeout(ms);
	}
}
