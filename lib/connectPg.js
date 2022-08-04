import pg from 'pg';

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
};
