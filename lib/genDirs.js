import { fileURLToPath } from 'url'
import { basename } from 'path';

export default function genDirs(importMeta) {
	const prefix = basename(fileURLToPath(importMeta.url)).split('_')[0];
	return { inDir: `${prefix}_in`, outDir: `${prefix}_out` };
}
