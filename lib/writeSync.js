import { writeDataSync } from 'indian-ocean';
import notify from 'wsk-notify';

const t = '\t';
export default function writeSync(outpath, data, { indent = 0 } = {}) {
	writeDataSync(outpath, data, { makeDirs: true });
	const idt = Array.from(Array(indent)).map(() => t).join('');
	notify({ m: `${idt}Wrote...`, v: outpath, d: ['green', 'bold'] })
}
