import dotenv from 'dotenv';

import connectPg from '../db/connectPg.js';

dotenv.config();

const pool = connectPg(process.env);

try {
	const { rows } = await pool.query('SELECT column_name FROM information_schema.columns LIMIT 10');
	console.log('rows', rows);
} catch (error) {
	console.error('Database connection error:', error);
} finally {
	await pool.end();
}
