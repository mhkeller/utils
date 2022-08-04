import pg from 'pg';
import dotenv from 'dotenv';

export default function connectPg(config) {
	/**
	 * If we have no config passed in, assume we have a .env
	 * file in our project root
	 */
	if (!config) {
		dotenv.config();
		config = process.env;
	}
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
};
