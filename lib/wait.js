import notify from 'wsk-notify';

export default function wait(page) {
	return async function waitFor (ms, msg = '') {
		notify({ m: 'Waiting...', v: `${ms / 1_000}s ${msg}`, d: ['gray', 'italic'] });
		return page.waitForTimeout(ms);
	}
}
