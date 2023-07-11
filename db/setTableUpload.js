import notify from '@mhkeller/notify';

import dotenv from 'dotenv';

import connectPg from './connectPg.js';
import makeIndent from '../lib/makeIndent.js';
import commas from '../lib/commas.js';

dotenv.config();

export default function setTableUpload (tableName, { cols, idColumn = 'id', logEvery = 1_500, total, indent } = {}) {
	const pool = connectPg(process.env);
	const idt = makeIndent(indent);
	async function uploadRow (row, i) {
		const text = `INSERT INTO
			${tableName}(${cols.join(', ')})
			VALUES(${cols.map((d, j) => `$${j + 1}`)})
			ON CONFLICT(${idColumn}) DO NOTHING RETURNING FALSE
	`;

		const values = cols.map(c => row[c]);

		const result = await pool.query({
			text,
			values
		});

		if (i % logEvery === 0 || i === total - 1) {
			notify({ m: `${idt}Uploaded...`, v: commas(i + 1), d: ['green', 'bold'] });
		}

		return result;
	}

	return { pool, uploadRow };
}
