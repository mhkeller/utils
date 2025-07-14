import pg from 'pg';

/**
 * Create a connection pool to a PostgreSQL database
 * @param {Object} config - Configuration object
 * @param {string} config.PG_HOST - PostgreSQL host
 * @param {string} config.PG_DB - PostgreSQL database name
 * @param {string} config.PG_USER - PostgreSQL username
 * @param {string} [config.PG_PW] - PostgreSQL password
 * @param {number} [config.PG_PORT] - PostgreSQL port
 * @returns {pg.Pool} - PostgreSQL connection pool
 */
export default function connectPg(config) {
	const credentials = {
		user: config.PG_USER,
		host: config.PG_HOST,
		password: config.PG_PW,
		port: config.PG_PORT,
		database: config.PG_DB
	};

	const pool = new pg.Pool(credentials);

	pool.on('error', err => {
		console.error(err);
	});

	return pool;
}
