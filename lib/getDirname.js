import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Get the directory name for the given import.meta
 * @param {ImportMeta} importMeta - The import.meta object from the calling module
 * @returns {string} The current directory
 */
export default function getDirname(importMeta) {
	return dirname(fileURLToPath(importMeta.url));
}
