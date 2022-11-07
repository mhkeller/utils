import checkIsTrue from './checkIsTrue.js';

export default function requireArg(msg = 'Argument required...', index = 2) {
	const arg = process.argv[index];

	checkIsTrue({
		condition: typeof arg !== 'undefined' && arg.trim() !== '',
		msg,
		value: 'undefined'
	});
	return process.argv.slice(index, process.argv.length).map(d => d.trim());
}
