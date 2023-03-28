import notify from '@mhkeller/notify';
import makeArray from './makeArray.js';

const t = '\t';
/**
	Sleep for a given amount of milliseconds
	@param {Number} ms Milliseconds to sleep
	@param {Object} [options]
	@param {Boolean} [options.log=false] Whether to log to console
	@param {Number} [options.indent] How many tabs to indent the notification by
*/
export default function sleep(ms, { log = false, indent = 0 } = {}) {
	if (log === true) {
		const seconds = ms / 1_000;
		let minutes;
		let hours;
		let f = 's';
		if (seconds > 60) {
			minutes = seconds / 60;
			f = ' mns';
		}
		if (minutes > 60) {
			hours = minutes / 60;
			f = ' hrs';
		}
		const idt = makeArray(indent).map(() => t).join('');
		notify({ m: `${idt}Sleeping for...`, v: `${hours || minutes || seconds}${f}`, d: ['gray', 'italic'] });
	}

	return new Promise(resolve => {
		setTimeout(() => resolve(), ms);
	});
}
