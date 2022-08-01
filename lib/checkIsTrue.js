import notify from 'wsk-notify';

export default function checkIsTrue(conditional, msg, value, context) {
	if (!conditional) {
		if (context) {
			console.log(context);
		}
		notify({ m: `${msg}:`, v: JSON.stringify(value, null, 2), d: ['bold', 'red'] });
		process.exit(1);
	}
}
