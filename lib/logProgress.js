import notify from '@mhkeller/notify';

import commas from './commas.js';

/**
 * Logs progress in loop to the console every n-times. Also logs the last iteration.
 * @param {number} i - Current iteration
 * @param {number} total - Total iterations
 * @param {object} [options] - Options object
 * @param {number} [options.logEvery=1500] - How often to log progress
 */
export default function logProgress (i, total, { logEvery = 1_500 } = {}) {
	if (i % logEvery === 0) {
		notify({ m: '\tProcessing...', v: `${commas(i + 1)} / ${commas(total)}`, d: ['cyan', 'bold'] });
	} else if (i === total - 1) {
		notify({ m: '\tProcessing...', v: `${commas(i + 1)} / ${commas(total)}`, d: ['cyan', 'bold'] });
	}
}
