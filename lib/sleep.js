import notify from '@mhkeller/notify';
import makeArray from './makeArray.js';
import prettyMs from './prettyMs.js';

const t = '\t';
/**
	Sleep for a given amount of milliseconds
	@param {Number} ms Milliseconds to sleep
	@param {Object} [options]
	@param {Boolean} [options.log=true] Whether to log to console
	@param {Number} [options.indent] How many tabs to indent the notification by
*/
export default function sleep(ms, { log = true, indent = 0 } = {}) {
	if (log === true) {
		const idt = makeArray(indent).map(() => t).join('');
		notify({ m: `${idt}Sleeping for...`, v: prettyMs(ms), d: ['gray', 'italic'] });
	}

	return new Promise(resolve => {
		setTimeout(() => resolve(), ms);
	});
}
