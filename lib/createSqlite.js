import { existsSync, rmSync } from 'node:fs';
import Database from 'better-sqlite3';
import notify from '@mhkeller/notify';

/**
 * @typedef {Record<string, 'null' | 'integer' | 'real' | 'text' | 'blob'>} Schema
 */

/**
 * @typedef {Object} Table
 * @property {string} tableName - The name of the table.
 * @property {Schema} schema - The schema of the table, where keys are column names and values are data types.
 */

/**
 * Creates a SQLite database file at the specified filepath.
 * @param {string} filepath - The path where the SQLite database file will be created.
 * @param {Object} config - Config for creating the database.
 * @param {string} config.dbName - The name of the database.
 * @param {Array<Table>} config.tables - The tables to create in the database.
 * @returns {import('better-sqlite3').Database} The created SQLite database instance.
 */
export default function createSqlite(filepath, { dbName, tables }) {
	if (!filepath || !dbName || !tables || !Array.isArray(tables)) {
		notify({
			m: 'Fields required:',
			v: `Filepath: ${filepath}, Database name: ${dbName}, Tables: ${JSON.stringify(tables, null, 2)}, `,
			d: 'error'
		});
		process.exit(1);
	}

	notify({ m: '\tCreating database', v: dbName, d: 'group' });

	if (existsSync(filepath)) {
		const force = process.argv.includes('--force');
		notify({ m: '\t\tDatabase already exists', d: force ? 'warn' : 'red' });

		if (!force) {
			process.exit(1);
		}
		notify({ m: '\t\tDeleting and rebuilding database', d: 'task' });
		rmSync(filepath);
	}

	const db = new Database(filepath);
	for (const { tableName, schema } of tables) {
		createTable(db, tableName, schema);
		notify({ m: `\t\tTable created:`, v: tableName, d: 'success' });
	}
	notify({ m: `\tDatabase created successfully`, d: 'success' });
	return db;
}

/**
 * Creates a table in the SQLite database.
 * @param {import('better-sqlite3').Database} db - The SQLite database instance.
 * @param {string} tableName - The name of the table to create.
 * @param {Schema} schema - The schema of the table, where keys are column names and values are data types.
 */
function createTable(db, tableName, schema) {
	// Validate tableName: must be alphanumeric or underscore
	if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
		throw new Error(`Invalid table name: ${tableName}`);
	}

	// Validate schema: keys must be valid column names, values must be valid types
	const validTypes = new Set(['null', 'integer', 'real', 'text', 'blob']);
	const sanitizedSchema = Object.entries(schema).map(([name, type]) => {
		if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
			throw new Error(`Invalid column name: ${name}`);
		}
		if (!validTypes.has(type)) {
			throw new Error(`Invalid column type for ${name}: ${type}`);
		}
		return `"${name}" ${type}`;
	});

	// Escape tableName and construct the SQL query
	const query = `
	CREATE TABLE IF NOT EXISTS "${tableName}" (
		row_id TEXT PRIMARY KEY,
		${sanitizedSchema.join(',\n')}
	);
	`;

	db.exec(query);
}
