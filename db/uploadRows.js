import notify from '@mhkeller/notify';

import setTableUpload from './setTableUpload.js';
import queueCalls from '../lib/queueCalls.js';
import commas from '../lib/commas.js';

/**
 * Uploads rows to a table
 * @param {string} tableName - Name of table to upload to
 * @param {object[]|string[]} rows - Rows to upload. If an array of strings, must also provide `mapRow` option
 * @param {object} [options] - Options object
 * @param {string} [options.idColumn='id'] - Name of column to use as primary key
 * @param {function} [options.mapRow=d=>d] - Function to map each row before uploading
 * @param {number} [options.indent=3] - How much to indent logs
 * @param {number} [options.uploadConcurrency=1500] - If not provided, defaults to `logEvery`
 */
export default async function uploadRows (tableName, rows, {
	idColumn = 'id',
	mapRow = d => d,
	indent = 3,
	uploadConcurrency = 1_500

} = {}) {
	if (rows.length === 0) {
		return;
	}

	const { pool, uploadRow } = setTableUpload(tableName, {
		cols: Object.keys(mapRow(rows[0])),
		total: rows.length,
		idColumn,
		logEvery: uploadConcurrency,
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
