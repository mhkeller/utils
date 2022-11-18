import { writeDataSync } from 'indian-ocean';
import notify from 'wsk-notify';

export default function writeSync(outpath, data) {
	writeDataSync(outpath, data, { makeDirs: true });
	notify({ m: 'Wrote...', v: outpath, d: ['green', 'bold'] })
}
