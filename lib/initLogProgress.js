import notify from '@mhkeller/notify';

import makeIndent from './makeIndent.js';
import commas from './commas.js';
import prettyMs from './prettyMs.js';

/**
 * Logs progress in loop to the console every n-times. Also logs the last iteration.
 * It also displays how much time is left in the process by calculating the average time per iteration.
 *
 * @param {number} total - The total number of iterations in the loop.
 * @param {object} [options] - Options object
 * @param {number} [options.every=1] - How many times to log the progress.
 * @returns {Function} - A function that logs the progress in the loop.
 */
export default function initLogProgress (total, { every = 1 } = {}) {
	const job = {
		startTime: null,
		timeLeft: null,
		rate: null
	};
	let i = -1;

	/**
  *
	* @function logProgressFn
	* @name logProgress
	* @description Logs progress in loop to the console every n-times. Also logs the last iteration.
	* @param {object} [options] - Options object
	* @param {string} [options.msg='Processing...'] - Message to display
	* @param {number} [options.indent=1] - How many tabs to indent the notification by
	* @param {boolean} [options.showRate=false] - Whether or not to show the rate per second

	* @returns {boolean} - Whether or not the progress was logged
	*/
	return function logProgress ({ msg = 'Processing...', indent = 1, showRate = false } = {}) {
		i += 1;
		let rate = '';
		if (i === 0) {
			job.startTime = Date.now();
			job.timeLeft = '';
			job.rate = '';
		} else {
			const timeElapsed = Date.now() - job.startTime;
			const timePerIteration = timeElapsed / i;
			const msLeft = (total - i) * timePerIteration;
			const iterationsPerSecond = 1 / (timePerIteration / 1000);

			job.rate = `${Math.round(iterationsPerSecond * 100) / 100}/sec`;
			job.timeLeft = `${prettyMs(msLeft)} left`;
		}

		if (showRate === true && job.rate) {
			rate = `${job.rate}, `;
		}

		const idt = makeIndent(indent);

		/**
			* Log progress every n-times
			* Also log the last iteration
			*/
		if (i % every === 0 || i === total - 1) {
			notify({
				m: `${idt}${msg}...`,
				v: `${commas(i + 1)} / ${commas(total)} (${rate}${job.timeLeft})`.replace(' ()', ''),
				d: ['cyan', 'bold']
			});
			return true;
		}
		return false;
	};
}
