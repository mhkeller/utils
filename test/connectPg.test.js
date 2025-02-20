import dotenv from 'dotenv';

import connectPg from '../db/connectPg.js';

dotenv.config();

const pool = connectPg(process.env);

const { rows } = await pool.query('SELECT column_name FROM information_schema.columns');
console.log('rows', rows);
