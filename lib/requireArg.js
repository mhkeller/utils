import checkIsTrue from './checkIsTrue.js';

/**
 * @param {string} msg - Error message
 * @param {number} index - Index of the argument to require
 * @returns {string} - The required argument
 */
export default function requireArg(msg = 'Argument required...', index = 2) {
	const arg = process.argv[index];

	checkIsTrue({
		condition: typeof arg !== 'undefined' && arg.trim() !== '',
		msg,
		value: 'undefined'
	});

	return arg.trim();
}
