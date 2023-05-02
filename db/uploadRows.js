import pLimit from 'p-limit';
import notify from '@mhkeller/notify';

import setTableUpload from './setTableUpload.js';
import commas from '../lib/commas.js';

const limit = pLimit(2_000);

export default async function uploadRows (tableName, rows, {
	idColumn = 'id',
	logEvery = 1_500
} = {}) {
	const { pool, uploadRow } = setTableUpload(tableName, Object.keys(rows[0]), {
		idColumn,
		logEvery
	});
	/**
	 * Arrays can only hold two-point-something million rows
	 * and we may have more values than that
	 * Batch these into arrays of one million rows each
	 */
	const batchLimit = 1_000_000;
	const batches = rows.reduce((b, row, i) => {
		const batchNumber = Math.floor(i / batchLimit);
		if (!b[batchNumber]) b[batchNumber] = [];

		const l = limit(() => uploadRow(row, i));
		b[batchNumber].push(l);
		return b;
	}, {});

	notify({ m: 'Grouped rows into...', v: `${Object.keys(batches).length} batches`, d: ['blue', 'bold'] });

	// eslint-disable-next-line no-restricted-syntax
	for (const [batchKey, batchRows] of Object.entries(batches)) {
		notify({ m: `Uploading batch ${batchKey}...`, v: `${commas(batchRows.length)} rows`, d: ['magenta', 'bold'] });
		await Promise.all(batchRows);
	}
	await pool.end();
}
