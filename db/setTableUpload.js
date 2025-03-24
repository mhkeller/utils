import notify from '@mhkeller/notify';

import dotenv from 'dotenv';

import connectPg from './connectPg.js';
import makeIndent from '../lib/makeIndent.js';
import commas from '../lib/commas.js';

dotenv.config();

/**
 * Set up a table for uploading
 * @param {string} tableName - Name of table to upload to
 * @param {object} options - Options object
 * @param {string[]} options.cols - Columns to upload
 * @param {string} [options.idColumn='id'] - Name of column to use as primary key
 * @param {number} [options.logEvery=1_500] - How often to log
 * @param {number} [options.total] - Total number of rows to upload
 * @param {number} [options.indent] - How much to indent logs
 * @param {function} [options.mapRow] - Function to map each row before uploading
 */
export default async function setTableUpload(
	tableName,
	{ cols = [], idColumn = 'id', logEvery = 1500, total, indent, mapRow } = { cols: [] }
) {
	const pool = connectPg(process.env);
	const idt = makeIndent(indent);

	/**
	 * Check all of our columns exist in our target table
	 */
	const { rows: tableCols } = await pool.query(
		`SELECT column_name
		FROM information_schema.columns
		WHERE table_name = $1;`,
		[tableName]
	);

	const tableColsSet = new Set(tableCols.map(d => d.column_name));
	const colsSet = new Set(cols.map(d => d.toLowerCase()));
	const extraCols = colsSet.difference(tableColsSet);

	if (extraCols.size > 0) {
		notify({
			m: `${idt}Columns in data not present in target table...`,
			v: `\n${[...extraCols].join(',\n')}`,
			d: 'error'
		});
		process.exit(1);
	}

	async function uploadRow(row, i) {
		const text = `INSERT INTO
			${tableName}(${cols.join(', ')})
			VALUES(${cols.map((d, j) => `$${j + 1}`)})
			ON CONFLICT(${idColumn}) DO NOTHING RETURNING FALSE`;

		const values = cols.map(c => (mapRow ? mapRow(row[c]) : row[c]));

		let result;
		try {
			result = await pool.query({
				text,
				values
			});

			if (i % logEvery === 0 || i === total - 1) {
				notify({ m: `${idt}Uploaded...`, v: commas(i + 1), d: ['green', 'bold'] });
			}
		} catch (err) {
			notify({ m: `${idt}Error uploading row...`, v: commas(i + 1), d: 'error' });
			console.error(err);

			console.log(
				values.map((d, j) => `(${j + 1}) ${cols[j]}: ${mapRow ? mapRow(d) : d}`).join('\n')
			);
			return { errors: 1 };
		}

		return { inserted: result.rows.length };
	}

	return { pool, uploadRow };
}
