import { writeDataSync } from 'indian-ocean';
import notify from '@mhkeller/notify';
import makeArray from './makeArray.js';

const t = '\t';
export default function writeSync(outpath, data, { indent, logIndent = 0 } = {}) {
	writeDataSync(outpath, data, { makeDirs: true, indent });
	const idt = makeArray(logIndent).map(() => t).join('');
	notify({ m: `${idt}Wrote...`, v: outpath, d: ['green', 'bold'] })
}
