import dotenv from 'dotenv';
import connectPg from './connectPg.js';

dotenv.config();

export default function setTableUpdate (tableName, {
	cols,
	idColumn = 'id',
	pool
} = {}) {
	if (!pool) {
		pool = connectPg(process.env);
	}

	async function updateRow (row) {
		const text = `UPDATE ${tableName}
			SET ${cols.map((d, j) => `${d} = $${j + 1}`)}
			WHERE ${idColumn} = $${cols.length + 1}`;

		const values = [...cols.map(c => row[c]), row[idColumn]];

		const result = await pool.query({
			text,
			values
		});

		return result;
	}

	return { pool, updateRow };
}
