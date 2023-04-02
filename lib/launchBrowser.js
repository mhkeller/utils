import { chromium } from 'playwright';

export default async function launchBrowser ({ headless = true, viewport = { width: 1080, height: 875 } } = {}) {
	const browser = await chromium.launch({ headless });
	const page = await browser.newPage({ viewport });
	return { browser, page };
}
