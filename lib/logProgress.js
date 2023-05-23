import notify from '@mhkeller/notify';

import commas from './commas.js';
import prettyMs from './prettyMs.js';

/**
 * Logs progress in loop to the console every n-times. Also logs the last iteration.
 * It also displays how much time is left in the process by calculating the average time per iteration.
 * @param {number} i - Current iteration
 * @param {number} total - Total iterations
 * @param {object} [options] - Options object
 * @param {number} [options.logEvery=1500] - How often to log progress
 */
let startTime;
let timeLeft = '';
export default function logProgress (i, total, { logEvery = 1_500 } = {}) {
	if (i === 0) {
		startTime = Date.now();
	} else {
		const timeElapsed = Date.now() - startTime;
		const timePerIteration = timeElapsed / i;
		const msLeft = (total - i) * timePerIteration;
		timeLeft = ` (${prettyMs(msLeft)} left)`;
	}

	if (i % logEvery === 0) {
		notify({ m: '\tProcessing...', v: `${commas(i + 1)} / ${commas(total)}${timeLeft}`, d: ['cyan', 'bold'] });
	} else if (i === total - 1) {
		notify({ m: '\tProcessing...', v: `${commas(i + 1)} / ${commas(total)}${timeLeft}`, d: ['cyan', 'bold'] });
	}
}
