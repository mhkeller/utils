import checkIsTrue from './checkIsTrue.js';

/**
 * Require a command line argument and exit if it is not provided
 * @param {string} msg - Error message to display if argument is missing
 * @param {number} index - Index of the argument to require in process.argv
 * @returns {string} - The required argument value, trimmed
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
