import roundDecimal from './roundDecimal.js';

/**
 * Take a number of milliseconds and return a human readable string
 * @param {number} ms - Number of milliseconds
 * @returns {string} - Human readable string
 */
export default function prettyMs(ms) {
	let seconds;
	let minutes;
	let hours;
	let days;
	let f = 'ms';
	if (ms >= 1_000) {
		seconds = ms / 1_000;
		f = 's';
	}
	if (seconds !== undefined && seconds > 60) {
		minutes = roundDecimal(seconds / 60);
		f = ' mnts';
	}
	if (minutes !== undefined && minutes > 60) {
		hours = roundDecimal(minutes / 60);
		f = ' hrs';
	}
	if (hours !== undefined && hours > 48) {
		days = roundDecimal(hours / 24);
		f = ' days';
	}
	return `${days || hours || minutes || (seconds !== undefined ? roundDecimal(seconds) : null) || Math.round(ms)}${f}`;
}
