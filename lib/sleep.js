import notify from '@mhkeller/notify';
import makeArray from './makeArray.js';
import prettyMs from './prettyMs.js';

const t = '\t';
/**
 * Sleep for a given amount of milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @param {Object} [options] - Options object
 * @param {boolean} [options.log=true] - Whether to log to console
 * @param {number} [options.indent=0] - How many tabs to indent the notification by
 * @param {number} [options.jitter=0] - A random percentage of this value in milliseconds to add to the sleep time
 * @returns {Promise<void>} - A promise that resolves after the sleep time
 */
export default function sleep(ms, { log = true, indent = 0, jitter = 0 } = {}) {
	if (jitter > 0) {
		const jitterAmount = Math.random() * jitter;
		ms += jitterAmount;
	}
	if (log === true) {
		const idt = makeArray(indent)
			.map(() => t)
			.join('');
		notify({ m: `${idt}Sleeping for...`, v: prettyMs(ms), d: ['gray', 'italic'] });
	}

	return new Promise(resolve => {
		setTimeout(() => resolve(), ms);
	});
}
