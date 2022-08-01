import { writeDataSync as wd } from 'indian-ocean';
import notify from 'wsk-notify';

export default function writeSync(outpath, data) {
	wd(outpath, data, { makeDirs: true });
	notify({ m: 'Wrote...', v: outpath, d: ['green',' bold'] })
}
