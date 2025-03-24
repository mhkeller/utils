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
 * @param {function} [options.mapRow] - Function to map each row before uploading
 * @param {number} [options.indent=3] - How much to indent logs
 * @param {number} [options.uploadConcurrency=1500] - If not provided, defaults to `logEvery`
 */
export default async function uploadRows(
	tableName,
	rows,
	{ idColumn = 'id', mapRow, indent = 3, uploadConcurrency = 1_500 } = {}
) {
	if (rows.length === 0) {
		return;
	}

	const { pool, uploadRow } = await setTableUpload(tableName, {
		cols: mapRow ? Object.keys(mapRow(rows[0])) : Object.keys(rows[0]),
		total: rows.length,
		idColumn,
		logEvery: uploadConcurrency,
		mapRow,
		indent
	});

	notify({ m: `\t\tUploading rows...`, v: `${commas(rows.length)} rows`, d: ['magenta', 'bold'] });
	const results = await queueCalls(
		mapRow ? rows.map((d, i) => mapRow(d, i)) : rows,
		uploadRow,
		uploadConcurrency
	);

	/**
	 * Tally up the result of the insert
	 */
	const rowCounts = results.reduce(
		(memo, r) => {
			if (r.inserted) {
				memo.inserted += r.inserted;
			}
			if (r.errors) {
				memo.errors += r.errors;
			}
			return memo;
		},
		{ inserted: 0, errors: 0 }
	);

	if (rowCounts.inserted > 0) {
		notify({
			m: `\t\tInserted...`,
			v: `${commas(rowCounts.inserted)} row${rowCounts.inserted === 1 ? '' : 's'}`,
			d: ['green', 'bold', 'underline']
		});
	}
	if (rowCounts.errors > 0) {
		notify({
			m: `\t\tErrors...  `,
			v: `${commas(rowCounts.errors)} row${rowCounts.errors === 1 ? '' : 's'}`,
			d: ['red', 'bold', 'underline']
		});
	} else if (rowCounts.inserted === 0 && rowCounts.errors === 0) {
		notify({ m: `\t\tAll rows exist!`, d: ['yellow', 'bold'] });
	}
	await pool.end();
}
