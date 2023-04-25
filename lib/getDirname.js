import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Get the current directory
 * @example
 *   const __dirname = getDirname()
 *   __dirname() // Current directory
 * @returns {Function} A function that returns the current directory
 */
export default function getDirname() {
	/**
	 * @returns {string} The current directory
	 */
	return function fn() {
		return dirname(fileURLToPath(import.meta.url));
	}
}
