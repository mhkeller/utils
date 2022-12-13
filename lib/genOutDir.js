import { fileURLToPath } from 'url'
import { basename } from 'path';

export default function genOutDir(importMeta) {
	const prefix = basename(fileURLToPath(importMeta.url)).split('_')[0];
	return `${prefix}_out`;
}
