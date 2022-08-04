import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export default function connectPg() {
	const credentials = {
		user: process.env.PG_USER,
		host: process.env.PG_HOST,
		password: process.env.PG_PW,
		port: process.env.PG_PORT,
		database: process.env.PG_DB
	};

	const pool = new pg.Pool(credentials);

	pool.on('error', err => {
		console.error(err);
	});

	return pool;
};
