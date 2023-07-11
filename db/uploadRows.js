import notify from '@mhkeller/notify';
import { commas } from '@mhkeller/utils';

import setTableUpload from './setTableUpload.js';
import queueCalls from '../utils/queueCalls.js';

const uploadConcurrency = 2_000;

/**
 * Uploads rows to a table
 * @param {string} tableName - Name of table to upload to
 * @param {object[]|string[]} rows - Rows to upload. If an array of strings, must also provide `mapRow` option
 * @param {object} [options] - Options object
 * @param {string} [options.idColumn='id'] - Name of column to use as primary key
 * @param {number} [options.logEvery=1500] - How often to log progress
 * @param {function} [options.mapRow=d=>d] - Function to map each row before uploading
 */
export default async function uploadRows (tableName, rows, {
	idColumn = 'id',
	logEvery = 1_500,
	mapRow = d => d,
	indent = 3
} = {}) {
	if (rows.length === 0) {
		return;
	}
	const { pool, uploadRow } = setTableUpload(tableName, {
		cols: Object.keys(mapRow(rows[0])),
		total: rows.length,
		idColumn,
		logEvery,
		mapRow,
		indent
	});

	notify({ m: `\t\tUploading rows...`, v: `${commas(rows.length)} rows`, d: ['magenta', 'bold'] });
	const results = await queueCalls(rows.map(d => mapRow(d)), uploadRow, uploadConcurrency);

	/**
	 * Tally up the result of the insert
	 */
	const insertedRows = results.reduce((a, r) => a + r.rows.length, 0);
	if (insertedRows > 0) {
		notify({ m: `\t\tInserted...`, v: `${commas(insertedRows)} rows`, d: ['green', 'bold', 'underline'] });
	} else {
		notify({ m: `\t\tAll rows exist!`, d: ['yellow', 'bold'] });
	}
	await pool.end();
}
