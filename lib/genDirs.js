import { fileURLToPath } from 'url'
import { basename } from 'path';

/**
 * Generate the input and output directory filepaths
 * @param {Object} importMeta The import.meta object
 * @returns {Object} An object with the input and output directory filepaths
 */
export default function genDirs(importMeta) {
	const prefix = basename(fileURLToPath(importMeta.url)).split('_')[0];
	return { inDir: `${prefix}_in`, outDir: `${prefix}_out` };
}
