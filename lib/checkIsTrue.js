import notify from 'wsk-notify';

export default function checkIsTrue({condition, msg, val, context}) {
	if (!condition) {
		if (context) {
			console.log(context);
		}
		notify({ m: `${msg}:`, v: JSON.stringify(val, null, 2), d: ['bold', 'red'] });
		process.exit(1);
	}
}
