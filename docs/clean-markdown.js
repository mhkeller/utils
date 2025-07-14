#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const files = ['./docs/api/database.md', './docs/api/scraping.md', './docs/api/sqlite.md'];

console.log('🔧 Cleaning remaining problematic markdown files...');

files.forEach(file => {
	try {
		let content = readFileSync(file, 'utf-8');

		// Fix remaining angle bracket issues
		content = content
			.replace(/<\{([^}]+)\}/g, 'Object with $1') // <{props} -> Object with props
			.replace(/\{([^}]+)\} - >/g, 'Object with $1 -') // {props} - > -> Object with props -
			.replace(/<([^>]*),\s*([^>]*)>/g, 'of $1 and $2') // <type1, type2> -> of type1 and type2
			.replace(/<([^>]+)>/g, 'of $1'); // remaining <T> -> of T

		writeFileSync(file, content);
		console.log(`✅ Cleaned ${file}`);
	} catch (error) {
		console.error(`❌ Error cleaning ${file}:`, error.message);
	}
});

console.log('\n🎉 Cleanup complete!');
