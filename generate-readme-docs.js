#!/usr/bin/env node

import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const libDir = './lib';
const dbDir = './db';
const scrapeDir = './scrape';

function extractJSDoc(filePath) {
	try {
		const content = readFileSync(filePath, 'utf-8');
		const jsdocMatch = content.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
		if (!jsdocMatch) return null;

		const jsdocContent = jsdocMatch[1];
		const description = jsdocContent.match(/^\s*\*\s*([^@].*?)(?=\s*\*\s*@|$)/s);
		const params = [
			...jsdocContent.matchAll(/\*\s*@param\s+\{([^}]+)\}\s+(\[?[^\s\]]+\]?)\s*-?\s*(.*)/g)
		];
		const returns = jsdocContent.match(/\*\s*@returns?\s+\{([^}]+)\}\s*-?\s*(.*)/s);

		return {
			description: description ? description[1].replace(/\s*\*\s*/g, ' ').trim() : '',
			params: params.map(match => ({
				name: match[2].replace(/[\[\]]/g, ''),
				type: match[1],
				description: match[3].trim(),
				optional: match[2].includes('[')
			})),
			returns: returns ? { type: returns[1], description: returns[2].trim() } : null
		};
	} catch (error) {
		return null;
	}
}

function generateFunctionDoc(name, filePath, module) {
	const jsdoc = extractJSDoc(filePath);
	if (!jsdoc) return `### ${name}\n\n_No documentation available_\n\n`;

	let doc = `### ${name}\n\n${jsdoc.description}\n\n`;

	if (jsdoc.params.length > 0) {
		doc += '**Parameters:**\n';
		jsdoc.params.forEach(param => {
			const optional = param.optional ? ' (optional)' : '';
			doc += `- \`${param.name}\` *${param.type}*${optional} - ${param.description}\n`;
		});
		doc += '\n';
	}

	if (jsdoc.returns) {
		doc += `**Returns:** *${jsdoc.returns.type}* - ${jsdoc.returns.description}\n\n`;
	}

	doc += `**Usage:**\n\`\`\`js\nimport { ${name} } from '@mhkeller/utils${module ? '/' + module : ''}';\n\`\`\`\n\n`;

	return doc;
}

function generateDocs() {
	let docs = '';

	// Core functions
	docs += '## Core Functions\n\n';
	const libFiles = readdirSync(libDir)
		.filter(f => f.endsWith('.js'))
		.sort();
	libFiles.forEach(file => {
		const name = file.replace('.js', '');
		docs += generateFunctionDoc(name, join(libDir, file));
	});

	// Database functions
	docs += '## Database Functions\n\n';
	const dbFiles = readdirSync(dbDir)
		.filter(f => f.endsWith('.js') && f !== 'index.js')
		.sort();
	dbFiles.forEach(file => {
		const name = file.replace('.js', '');
		docs += generateFunctionDoc(name, join(dbDir, file), 'db');
	});

	// Scraping functions
	docs += '## Web Scraping Functions\n\n';
	const scrapeFiles = readdirSync(scrapeDir)
		.filter(f => f.endsWith('.js') && f !== 'index.js')
		.sort();
	scrapeFiles.forEach(file => {
		const name = file.replace('.js', '');
		docs += generateFunctionDoc(name, join(scrapeDir, file), 'scrape');
	});

	return docs;
}

// Read current README
const readmePath = './README.md';
let readme = readFileSync(readmePath, 'utf-8');

// Generate new docs
const newDocs = generateDocs();

// Replace or append docs section
const docsMarker = '<!-- AUTO-GENERATED DOCS -->';
const docsStart = readme.indexOf(docsMarker);

if (docsStart !== -1) {
	// Replace existing docs
	const beforeDocs = readme.substring(0, docsStart);
	readme = beforeDocs + docsMarker + '\n\n' + newDocs;
} else {
	// Append to end
	readme += '\n\n' + docsMarker + '\n\n' + newDocs;
}

writeFileSync(readmePath, readme);
console.log('✅ Updated README.md with auto-generated documentation');
