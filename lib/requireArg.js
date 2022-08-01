import checkIsTrue from './checkIsTrue.js';

export default function requireArg(message = 'Argument required...', index = 2) {
	const arg = process.argv[index];

	checkIsTrue(typeof arg !== 'undefined' && arg.trim() !== '', message, arg);
	return process.argv.slice(index, process.argv.length);
}
