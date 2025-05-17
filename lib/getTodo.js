import { existsSync } from 'node:fs';
import notify from '@mhkeller/notify';
import commas from './commas.js';

/**
 * @param {Array<any>} files - Array of things
 * @param {function} [exists] - Function that returns a filepath to check
 * @returns {Array<any>} - Array of files that exist
 */
export default function getTodo(files, exists = (/** @type {any} */ f) => f) {
	notify({
		m: 'Found...',
		v: commas(files.length),
		d: 'group'
	});
	const todo = files.filter(f => !existsSync(exists(f)));

	notify({
		m: 'Todo... ',
		v: commas(todo.length),
		d: ['magenta', 'bold', 'underline']
	});
	return todo;
}
