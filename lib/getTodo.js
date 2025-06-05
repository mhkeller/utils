import { existsSync } from 'node:fs';
import notify from '@mhkeller/notify';
import commas from './commas.js';

/**
 * Filter an array of items to only those that don't exist in the filesystem
 * @param {Array<any>} files - Array of items to check
 * @param {function(any): string} [exists] - Function that returns a filepath to check for existence
 * @returns {Array<any>} - Array of files that don't exist
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
