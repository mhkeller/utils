import notify from '@mhkeller/notify';
import dotenv from 'dotenv';

import connectPg from './connectPg.js';
import commas from '../lib/commas.js';

dotenv.config();

export default function setTableUpload (tableName, cols, { idColumn = 'id', logEvery = 1_500 } = {}) {
	const pool = connectPg(process.env);
	async function uploadRow (row, i) {
		const text = `INSERT INTO
			${tableName}(${cols.join(', ')})
			VALUES(${cols.map((d, j) => `$${j + 1}`)})
			ON CONFLICT(${idColumn}) DO NOTHING
	`;

		const values = cols.map(c => row[c]);

		await pool.query({
			text,
			values
		});

		if (i % logEvery === 0) {
			notify({ m: '\tUploaded...', v: commas(i), d: ['cyan', 'bold'] });
		}
	}

	return { pool, uploadRow };
}
