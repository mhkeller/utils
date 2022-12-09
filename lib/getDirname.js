import { dirname } from 'path';
import { fileURLToPath } from 'url';

/* --------------------------------------------
 *
 * Usage:
 * const __dirname = getDirname()
 * __dirname() // Current directory
 *
 * --------------------------------------------
 */
export default function getDirname() {
	return function fn() {
		const __dirname = dirname(fileURLToPath(import.meta.url));
		return __dirname;
	}
}
