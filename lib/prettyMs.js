/**
 * Take a number of milliseconds and return a human readable string
 * @param {number} ms - Number of milliseconds
 * @returns {string} - Human readable string
 */
export default function prettyMs (ms) {
	const seconds = ms / 1_000;
	let minutes;
	let hours;
	let f = 's';
	if (seconds > 60) {
		minutes = seconds / 60;
		f = ' mns';
	}
	if (minutes > 60) {
		hours = (minutes / 60).toFixed(1);
		f = ' hrs';
	}
	return `${+hours || minutes || seconds}${f}`;
}
