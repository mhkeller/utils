import { writeDataSync } from 'indian-ocean';
import notify from '@mhkeller/notify';
import makeArray from './makeArray.js';

const t = '\t';
/**
	Write a data file
	@param {String} outpath The path to write to
	@param {Array|Object} data The data to write
	@param {Object} [options]
	@param {Number} [options.indent] If writing a JSON file, the number that will be passed to JSON.stringify to pretty print the object
	@param {Number} [options.logIndent] How many tabs to indent the log
	@returns {String}
*/
export default function writeSync(outpath, data, { indent, logIndent = 0 } = {}) {
	writeDataSync(outpath, data, { makeDirs: true, indent });
	const idt = makeArray(logIndent).map(() => t).join('');
	notify({ m: `${idt}Wrote...`, v: outpath, d: ['green', 'bold'] })
}
