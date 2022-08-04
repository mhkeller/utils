export default async function screenshotRoot(browser, root, { screenshotOutPath }) {
	// eslint-disable-next-line no-restricted-syntax
	for (const svg of root.tagName === 'svg' ? [root] : root.querySelectorAll('svg')) {
	  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
	  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
	}

	/**
	 * Create a page and set the HTML
	 */
	const page = await browser.newPage();
	await page.setContent(root.outerHTML, {
		waitUntil: 'domcontentloaded'
	});

	/**
	 * Fix some labels
	 */
	await page.addStyleTag({ content: 'g[aria-label="fy-axis"] text{transform:translateX(-10px);}' });
	await page.locator('body > svg').screenshot({ path: screenshotOutPath });
}
