import notify from 'wsk-notify';

export default function sleep(ms, { log = false } = {}) {
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
		notify({ m: 'Sleeping for...', v: `${hours || minutes || seconds}${f}`, d: ['gray', 'italic'] });
	}

	return new Promise(resolve => {
		setTimeout(() => resolve(), ms);
	});
}
