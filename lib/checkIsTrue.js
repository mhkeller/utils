import notify from '@mhkeller/notify';

/**
 * Checks if a condition is true. If not, it logs the value and exits the process.
 * @param {object} options - Options object
 * @param {boolean} options.condition - The condition to check
 * @param {string} options.msg - The message to display if the condition is false
 * @param {any} options.value - The value to display if the condition is false
 * @param {any} [options.context] - The context to display if the condition is false
 */
export default function checkIsTrue({condition, msg, value, context}) {
	if (!condition) {
		if (context) {
			console.log(context);
		}
		notify({ m: `${msg}:`, v: JSON.stringify(value, null, 2), d: ['bold', 'red'] });
		process.exit(1);
	}
}
