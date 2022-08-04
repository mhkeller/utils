/* eslint-disable no-restricted-syntax */
import { join } from 'path';
import notify from 'wsk-notify';
import * as Plot from '@observablehq/plot';
import { chromium } from 'playwright';

import withJsdom from '../utils/withJsdom.js';
import screenshotRoot from '../utils/screenshotRoot.js';

export default async function drawHistograms(data, { facetBy = [], fields = [], screenshotOutDir, fill = '#000' }) {
	notify({ m: 'Generating histograms...', d: ['magenta', 'bold'] });
	const browser = await chromium.launch({ headless: true });

	/**
	 * Facet by our list of facet keys
	 */
	for (const fb of facetBy) {
		/**
		 * And make a chart for each field we want a histogram of
		 */
		for (const f of fields) {
			/**
			 * Define our chart specification
			 */
			const chart = async () => Plot.plot({
				facet: {
					data,
					y: fb,
				},
				fy: {
					label: ''
				},
				marks: [
					Plot.rectY(data, Plot.binX({ y: 'count' }, { x: f, fill })),
					Plot.ruleY([0])
				]
			});

			/**
			 * Render the chart with JsDOM
			 */
			const root = await withJsdom(chart)();

			/**
			 * Fix some labels
			 */
			const css = 'g[aria-label="fy-axis"] text{transform:translateX(-10px);}';

			/**
			 * Take a screenshot with Playwright
			 */
			const screenshotOutPath = join(screenshotOutDir, `by__${fb}_${f}.png`);
			await screenshotRoot(browser, root, {
				screenshotOutPath,
				css
			});
			notify({ m: '\tWrote screenshot...', v: screenshotOutPath, d: ['blue', 'bold'] });
		}
	}

	await browser.close();
}
