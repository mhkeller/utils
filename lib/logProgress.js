import notify from '@mhkeller/notify';
import { makeIndent, commas, prettyMs } from '@mhkeller/utils';

/**
 * Logs progress in loop to the console every n-times. Also logs the last iteration.
 * It also displays how much time is left in the process by calculating the average time per iteration.
 * @param {number} i - Current iteration
 * @param {number} total - Total iterations
 * @param {object} [options] - Options object
 * @param {number} [options.logEvery=1500] - How often to log progress
 * @param {string} [options.msg='Processing...'] - Message to display
 * @param {number} [options.indent=1] - How many tabs to indent the notification by
 * @param {string} [options.jobId='a'] - The job ID

 * @returns {boolean} - Whether or the progress was logged
 */
const jobs = {};
export default function logProgress (i, total, { every = 1_500, msg = 'Processing...', indent = 1, jobId = 'a', showRate = false } = {}) {
	let rate = '';
	if (!jobs[jobId]) {
		jobs[jobId] = {
			startTime: null,
			timeLeft: null,
			rate: null
		};
	}
	if (i === 0) {
		jobs[jobId].startTime = Date.now();
		jobs[jobId].timeLeft = '';
		jobs[jobId].rate = '';
	} else {
		const timeElapsed = Date.now() - jobs[jobId].startTime;
		const timePerIteration = timeElapsed / i;
		const msLeft = (total - i) * timePerIteration;
		const iterationsPerSecond = 1 / (timePerIteration / 1000);

		jobs[jobId].rate = `${Math.round(iterationsPerSecond * 100) / 100}/sec`;
		jobs[jobId].timeLeft = `${prettyMs(msLeft)} left`;
	}

	if (showRate === true && jobs[jobId].rate) {
		rate = `${jobs[jobId].rate}, `;
	}

	const idt = makeIndent(indent);

	/**
	 * Log progress every n-times
	 * Also log the last iteration
	 */
	if (i % every === 0 || i === total - 1) {
		notify({ m: `${idt}${msg}...`, v: `${commas(i + 1)} / ${commas(total)} (${rate}${jobs[jobId].timeLeft})`.replace(' ()', ''), d: ['cyan', 'bold'] });
		return true;
	}
	return false;
}
