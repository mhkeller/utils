import roundDecimel from './roundDecimel.js';

/**
 * Take a number of milliseconds and return a human readable string
 * @param {number} ms - Number of milliseconds
 * @returns {string} - Human readable string
 */
export default function prettyMs (ms) {
	let seconds;
	let minutes;
	let hours;
	let days;
	let f = 'ms';
	if (ms >= 1_000) {
		seconds = ms / 1_000;
		f = 's';
	}
	if (seconds > 60) {
		minutes = roundDecimel(seconds / 60);
		f = ' mnts';
	}
	if (minutes > 60) {
		hours = roundDecimel(minutes / 60);
		f = ' hrs';
	}
	if (hours > 48) {
		days = roundDecimel(hours / 24);
		f = ' days';
	}
	return `${days || hours || minutes || roundDecimel(seconds) || Math.round(ms)}${f}`;
}

