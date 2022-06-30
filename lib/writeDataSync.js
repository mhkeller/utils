import { writeDataSync as wd } from 'indian-ocean';
import notify from '@mhkeller/notify';

export default function writeDataSync(outpath, data) {
	wd(outpath, data, { makeDirs: true });
	notify({ m: 'Wrote...', v: outpath, d: ['green',' bold'] })
}
