import notify from '@mhkeller/notify';

import commas from './commas.js';

/**
 * Logs progress in loop to the console
 * @param {number} i - Current iteration
 * @param {number} total - Total iterations
 * @param {number} logEvery - Tow often to log progress
 */
export default function logProgress (i, total, logEvery = 1_500) {
	const j = i + 1;
	const ct = commas(total);
	if (i % logEvery === 0) {
		notify({ m: '\tProcessing...', v: `${commas(j)} / ${ct}`, d: ['cyan', 'bold'] });
	}
	if (i === total - 1) {
		notify({ m: '\tProcessing...', v: `${commas(j)} / ${ct}`, d: ['cyan', 'bold'] });
	}
}
