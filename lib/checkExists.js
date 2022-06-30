import notify from '@mhkeller/notify';

export default function checkExists(conditional, msg, context) {
	if (conditional === false) {
		if (context) {
			console.log(context);
		}
		notify({ m: msg, d: 'error' });
		process.exit(1);
	}
}
