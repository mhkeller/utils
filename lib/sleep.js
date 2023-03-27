import notify from '@mhkeller/notify';
import makeArray from './makeArray.js';

const t = '\t';
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
