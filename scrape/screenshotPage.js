import notify from '@mhkeller/notify';

/**
 * Wait for a specified time on a page
 * @param {import('playwright').Page} page - Playwright page instance
 * @param {number} ms - Time to wait in milliseconds
 * @param {string} [msg=''] - Optional message to display while waiting
 * @returns {Promise<void>} - Promise that resolves when waiting is complete
 */
async function wait(page, ms, msg = '') {
	notify({ m: '\t\tWaiting...', v: `${ms / 1_000}s ${msg}`, d: ['gray', 'italic'] });
	return page.waitForTimeout(ms);
}

/**
 * Take a screenshot of a webpage
 * @param {import('playwright').Page} page - Playwright page instance
 * @param {string} url - URL of the page to screenshot
 * @param {Object} options - Screenshot options
 * @param {string} options.path - Path where the screenshot will be saved
 * @param {number} [options.wait=5000] - Time to wait in milliseconds before taking screenshot
 * @param {string} [options.waitUntil='load'] - Navigation wait condition
 * @returns {Promise<void>} - Promise that resolves when screenshot is complete
 */
export default async function screenshotPage(
	page,
	url,
	{ path, wait: ms = 5_000, waitUntil = 'load' }
) {
	if (!path) {
		throw new TypeError(`Path required for screenshot output`);
	}
	await page.goto(url, { waitUntil });
	await wait(page, ms);

	/**
	 * Add a timestamp onto the image
	 */
	await page.evaluate(() => {
		const div = document.createElement('div');
		const d = new Date();
		div.textContent = `${d.toDateString()} ${d.toTimeString()}`;
		div.setAttribute(
			'style',
			'position: fixed; top: 0; left: 3px;font-family:consolas,monospace;z-index:9007199254740991;'
		);
		document.body.appendChild(div);
	});
	await page.screenshot({ path, fullPage: true });
}
