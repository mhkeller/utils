import pLimit from 'p-limit';
import notify from '@mhkeller/notify';

import setTableUpload from './setTableUpload.js';
import commas from '../lib/commas.js';

const limit = pLimit(2_000);

export default async function uploadRows (tableName, rows, {
	idColumn = 'id',
	logEvery = 1_500,
	mapRow = d => d,
	columns = []
} = {}) {
	const { pool, uploadRow } = setTableUpload(tableName, columns || Object.keys(rows[0]), {
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

		const l = limit(() => uploadRow(mapRow(row), i));
		b[batchNumber].push(l);
		return b;
	}, {});

	const batchLength = Object.keys(batches).length;
	notify({ m: 'Grouped rows into...', v: `${batchLength} batch${batchLength > 1 ? 'es' : ''}`, d: ['blue', 'bold'] });

	// eslint-disable-next-line no-restricted-syntax
	for (const [batchKey, batchRows] of Object.entries(batches)) {
		notify({ m: `Uploading batch ${batchKey}...`, v: `${commas(batchRows.length)} rows`, d: ['magenta', 'bold'] });
		await Promise.all(batchRows);
	}
	await pool.end();
}
