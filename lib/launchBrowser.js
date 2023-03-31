import { chromium } from 'playwright';

export default async function launchBrowser ({ headless = true } = {}) {
	const browser = await chromium.launch({ headless });
	const page = await browser.newPage();
	return { browser, page };
}
