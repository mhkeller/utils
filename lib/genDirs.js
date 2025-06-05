import { fileURLToPath } from 'node:url';
import { basename, join } from 'node:path';

/**
 * Generate the input and output directory filepaths

 * @param {ImportMeta} importMeta The import.meta object
 * @param {string} [baseDir=''] The base directory
 * @returns {{inDir: string, outDir: string}} An object with the input and output directory filepaths
 */
export default function genDirs(importMeta, baseDir = '') {
	const prefix = basename(fileURLToPath(importMeta.url)).split('_')[0];
	return {
		inDir: join(baseDir, 'in', `${prefix}_in`),
		outDir: join(baseDir, 'out', `${prefix}_out`)
	};
}
