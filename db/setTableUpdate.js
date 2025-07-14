import dotenv from 'dotenv';
import connectPg from './connectPg.js';

dotenv.config();

/**
 * Set up a table for updating rows
 * @param {string} tableName - Name of table to update
 * @param {object} options - Options object
 * @param {string[]} options.cols - Columns to update
 * @param {string} [options.idColumn='id'] - Name of column to use as primary key
 * @param {import('pg').Pool} [options.pool] - Existing PostgreSQL connection pool
 * @returns {{pool: import('pg').Pool, updateRow: Function}} - Pool and updateRow function
 */
export default function setTableUpdate(tableName, { cols, idColumn = 'id', pool } = {}) {
	if (!pool) {
		pool = connectPg(process.env);
	}

	/**
	 * Update a row in the database
	 * @param {Object} row - Row data with values to update
	 * @returns {Promise<import('pg').QueryResult>} - Query result
	 */
	async function updateRow(row) {
		// Validate table name and column names to prevent SQL injection
		const tableNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
		const columnNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

		if (!tableNameRegex.test(tableName)) {
			throw new Error(`Invalid table name: ${tableName}`);
		}

		if (!cols.every(col => columnNameRegex.test(col))) {
			throw new Error(`Invalid column name(s) in: ${cols.join(', ')}`);
		}

		if (!columnNameRegex.test(idColumn)) {
			throw new Error(`Invalid id column name: ${idColumn}`);
		}

		const text = `UPDATE "${tableName}"
			SET ${cols.map((d, j) => `"${d}" = $${j + 1}`).join(', ')}
			WHERE "${idColumn}" = $${cols.length + 1}`;

		const values = [...cols.map(c => row[c]), row[idColumn]];

		const result = await pool.query({
			text,
			values
		});

		return result;
	}

	return { pool, updateRow };
}
