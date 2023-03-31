import { chromium } from 'playwright';

export default async function launchBrowser () {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	return { browser, page };
}
