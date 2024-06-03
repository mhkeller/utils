import notify from '@mhkeller/notify';

async function wait (page, ms, msg = '') {
	notify({ m: '\t\tWaiting...', v: `${ms / 1_000}s ${msg}`, d: ['gray', 'italic'] });
	return page.waitForTimeout(ms);
}

export default async function screenshotPage (page, url, { path, wait: ms = 5_000, waitUntil = 'load' }) {
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
		div.setAttribute('style', 'position: fixed; top: 0; left: 3px;font-family:consolas,monospace;z-index:999999999;');
		document.body.appendChild(div);
	});
	await page.screenshot({ path, fullPage: true });
}
