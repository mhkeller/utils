import { chromium } from 'playwright';

/**
 * Launch a browser using Playwright
 * @param {Object} [options] - Browser launch options
 * @param {boolean} [options.headless=true] - Whether to run browser in headless mode
 * @param {Object} [options.viewport] - Viewport dimensions
 * @param {number} [options.viewport.width=1080] - Viewport width in pixels
 * @param {number} [options.viewport.height=875] - Viewport height in pixels
 * @returns {Promise<{browser: import('playwright').Browser, page: import('playwright').Page}>} - Browser and page instances
 */
export default async function launchBrowser({
	headless = true,
	viewport = { width: 1080, height: 875 }
} = {}) {
	const browser = await chromium.launch({ headless });
	const page = await browser.newPage({ viewport });
	return { browser, page };
}
