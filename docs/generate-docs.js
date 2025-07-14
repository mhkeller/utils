#!/usr/bin/env node

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const libDir = join(rootDir, 'lib');
const dbDir = join(rootDir, 'db');
const scrapeDir = join(rootDir, 'scrape');
const docsDir = join(rootDir, 'docs');

// Categories for organizing functions (alphabetically sorted)
const categories = {
	'array-object': {
		title: 'Array & Object Utils',
		description: 'Functions for working with arrays, objects, and data structures.',
		functions: ['createLookup', 'makeArray', 'pick', 'takeEvery', 'uniques'] // alphabetical
	},
	string: {
		title: 'String Utils',
		description: 'Functions for string manipulation and formatting.',
		functions: ['makeIndent', 'padBy', 'toTitleCase'] // alphabetical
	},
	number: {
		title: 'Number Utils',
		description: 'Functions for number formatting and mathematical operations.',
		functions: ['commas', 'prettyMs', 'roundDecimal'] // alphabetical
	},
	'time-progress': {
		title: 'Time & Progress',
		description: 'Functions for time handling, delays, and progress tracking.',
		functions: ['getNow', 'initLogProgress', 'sleep', 'sleepEvery'] // alphabetical
	},
	'file-data': {
		title: 'File & Data',
		description: 'Functions for reading, writing, and processing data files.',
		functions: ['fetchData', 'formatParams', 'genDirs', 'readDataset', 'readXlsx', 'writeSync'] // alphabetical
	},
	utilities: {
		title: 'General Utilities',
		description: 'Miscellaneous utility functions.',
		functions: ['checkIsTrue', 'getTodo', 'paginatedFetcher', 'queueCalls', 'requireArg'] // alphabetical
	}
};

function extractJSDoc(filePath) {
	try {
		const content = readFileSync(filePath, 'utf-8');

		// Extract JSDoc comment block
		const jsdocMatch = content.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
		if (!jsdocMatch) return null;

		const jsdocContent = jsdocMatch[1];

		// Parse JSDoc components
		const description = jsdocContent.match(/^\s*\*\s*([^@].*?)(?=\s*\*\s*@|$)/s);
		const params = [
			...jsdocContent.matchAll(/\*\s*@param\s+\{([^}]+)\}\s+(\[?[^\s\]]+\]?)\s*-?\s*(.*)/g)
		];
		const returns = jsdocContent.match(/\*\s*@returns?\s+\{([^}]+)\}\s*-?\s*(.*)/s);

		// Clean up types to avoid Vue parsing issues
		function cleanType(type) {
			return type
				.replace(/import\([^)]+\)\./g, '') // Remove import() syntax
				.replace(/<([^>]+)>/g, '($1)') // Replace <T> with (T)
				.replace(/Array<([^>]+)>/g, 'Array of $1') // Array<T> -> Array of T
				.replace(/Promise<([^>]+)>/g, 'Promise of $1') // Promise<T> -> Promise of T
				.replace(/Map<([^,]+),\s*([^>]+)>/g, 'Map of $1 to $2') // Map<K,V> -> Map of K to V
				.replace(/\{([^}]+)\}/g, 'Object with $1') // {props} -> Object with props
				.replace(/\|/g, ' or '); // union types
		}

		return {
			description: description ? description[1].replace(/\s*\*\s*/g, ' ').trim() : '',
			params: params.map(match => ({
				type: cleanType(match[1]),
				name: match[2],
				description: match[3].trim()
			})),
			returns: returns
				? {
						type: cleanType(returns[1]),
						description: returns[2].trim()
					}
				: null
		};
	} catch (error) {
		console.warn(`Could not extract JSDoc from ${filePath}:`, error.message);
		return null;
	}
}

function generateFunctionDocs(functionName, filePath, folder = 'lib') {
	const jsdoc = extractJSDoc(filePath);
	const fileName = folder === 'lib' ? `${functionName}.js` : `${functionName}.js`;
	const githubUrl = `https://github.com/mhkeller/utils/blob/main/${folder}/${fileName}`;

	if (!jsdoc) {
		return `## ${functionName}

**File:** \`${folder}/${functionName}.js\` | [View Source](${githubUrl})

_Documentation not available - please check the source file for details._

`;
	}

	let markdown = `## ${functionName}

**File:** \`${folder}/${functionName}.js\` | [View Source](${githubUrl})

${jsdoc.description}

`;

	if (jsdoc.params.length > 0) {
		markdown += `**Parameters:**\n`;
		jsdoc.params.forEach(param => {
			const isOptional =
				param.name.includes('[') || param.description.toLowerCase().includes('optional');
			const cleanName = param.name.replace(/[\[\]]/g, '');
			const optionalText = isOptional ? ', optional' : '';
			markdown += `- \`${cleanName}\` (${param.type}${optionalText}) - ${param.description}\n`;
		});
		markdown += '\n';
	}

	if (jsdoc.returns) {
		markdown += `**Returns:**\n- ${jsdoc.returns.type} - ${jsdoc.returns.description}\n\n`;
	}

	// Add example placeholder
	markdown += `**Example:**\n\`\`\`js\nimport { ${functionName} } from '@mhkeller/utils'\n\n// Usage example for ${functionName}\n\`\`\`\n\n`;

	return markdown;
}

function generateCategoryDocs(categoryKey, category) {
	const { title, description, functions } = category;

	let markdown = `# ${title}\n\n${description}\n\n`;

	// Sort functions alphabetically and generate docs
	functions.sort().forEach(functionName => {
		const filePath = join(libDir, `${functionName}.js`);
		markdown += generateFunctionDocs(functionName, filePath);
	});

	writeFileSync(join(docsDir, 'api', `${categoryKey}.md`), markdown);
	console.log(`✅ Generated docs for ${title} (${functions.length} functions)`);
}

function generateDatabaseDocs() {
	const dbFunctions = [
		{ name: 'connectPg', file: 'connectPg.js' },
		{ name: 'setTableUpload', file: 'setTableUpload.js' },
		{ name: 'uploadRows', file: 'uploadRows.js' }
	].sort((a, b) => a.name.localeCompare(b.name)); // alphabetical

	let markdown = `# Database Functions\n\nUtilities for working with PostgreSQL and other databases.\n\n`;

	dbFunctions.forEach(({ name, file }) => {
		const filePath = join(dbDir, file);
		const githubUrl = `https://github.com/mhkeller/utils/blob/main/db/${file}`;
		const jsdoc = extractJSDoc(filePath);

		if (!jsdoc) {
			markdown += `## ${name}

**File:** \`db/${file}\` | [View Source](${githubUrl})

_Documentation not available - please check the source file for details._

`;
			return;
		}

		markdown += `## ${name}

**File:** \`db/${file}\` | [View Source](${githubUrl})

${jsdoc.description}

`;

		if (jsdoc.params.length > 0) {
			markdown += `**Parameters:**\n`;
			jsdoc.params.forEach(param => {
				const isOptional =
					param.name.includes('[') || param.description.toLowerCase().includes('optional');
				const cleanName = param.name.replace(/[\[\]]/g, '');
				const optionalText = isOptional ? ', optional' : '';
				markdown += `- \`${cleanName}\` (${param.type}${optionalText}) - ${param.description}\n`;
			});
			markdown += '\n';
		}

		if (jsdoc.returns) {
			markdown += `**Returns:**\n- ${jsdoc.returns.type} - ${jsdoc.returns.description}\n\n`;
		}

		// Add example placeholder
		markdown += `**Example:**\n\`\`\`js\nimport { ${name} } from '@mhkeller/utils/db'\n\n// Usage example for ${name}\n\`\`\`\n\n`;
	});

	writeFileSync(join(docsDir, 'api', 'database.md'), markdown);
	console.log(`✅ Generated database docs (${dbFunctions.length} functions)`);
}

function generateSQLiteDocs() {
	const filePath = join(libDir, 'createSqlite.js');
	const githubUrl = 'https://github.com/mhkeller/utils/blob/main/lib/createSqlite.js';
	let markdown = `# SQLite Functions\n\nUtilities for working with SQLite databases.\n\n`;

	const jsdoc = extractJSDoc(filePath);

	if (!jsdoc) {
		markdown += `## createSqlite

**File:** \`lib/createSqlite.js\` | [View Source](${githubUrl})

_Documentation not available - please check the source file for details._

`;
	} else {
		markdown += `## createSqlite

**File:** \`lib/createSqlite.js\` | [View Source](${githubUrl})

${jsdoc.description}

`;

		if (jsdoc.params.length > 0) {
			markdown += `**Parameters:**\n`;
			jsdoc.params.forEach(param => {
				const isOptional =
					param.name.includes('[') || param.description.toLowerCase().includes('optional');
				const cleanName = param.name.replace(/[\[\]]/g, '');
				const optionalText = isOptional ? ', optional' : '';
				markdown += `- \`${cleanName}\` (${param.type}${optionalText}) - ${param.description}\n`;
			});
			markdown += '\n';
		}

		if (jsdoc.returns) {
			markdown += `**Returns:**\n- ${jsdoc.returns.type} - ${jsdoc.returns.description}\n\n`;
		}

		// Add example placeholder
		markdown += `**Example:**\n\`\`\`js\nimport { createSqlite } from '@mhkeller/utils'\n\n// Usage example for createSqlite\n\`\`\`\n\n`;
	}

	writeFileSync(join(docsDir, 'api', 'sqlite.md'), markdown);
	console.log(`✅ Generated SQLite docs`);
}

function generateScrapingDocs() {
	const scrapeFunctions = [
		{ name: 'launchBrowser', file: 'launchBrowser.js' },
		{ name: 'screenshotPage', file: 'screenshotPage.js' },
		{ name: 'wait', file: 'wait.js' }
	].sort((a, b) => a.name.localeCompare(b.name)); // alphabetical

	let markdown = `# Web Scraping Functions\n\nUtilities for browser automation and web scraping.\n\n`;

	scrapeFunctions.forEach(({ name, file }) => {
		const filePath = join(scrapeDir, file);
		const githubUrl = `https://github.com/mhkeller/utils/blob/main/scrape/${file}`;
		const jsdoc = extractJSDoc(filePath);

		if (!jsdoc) {
			markdown += `## ${name}

**File:** \`scrape/${file}\` | [View Source](${githubUrl})

_Documentation not available - please check the source file for details._

`;
			return;
		}

		markdown += `## ${name}

**File:** \`scrape/${file}\` | [View Source](${githubUrl})

${jsdoc.description}

`;

		if (jsdoc.params.length > 0) {
			markdown += `**Parameters:**\n`;
			jsdoc.params.forEach(param => {
				const isOptional =
					param.name.includes('[') || param.description.toLowerCase().includes('optional');
				const cleanName = param.name.replace(/[\[\]]/g, '');
				const optionalText = isOptional ? ', optional' : '';
				markdown += `- \`${cleanName}\` (${param.type}${optionalText}) - ${param.description}\n`;
			});
			markdown += '\n';
		}

		if (jsdoc.returns) {
			markdown += `**Returns:**\n- ${jsdoc.returns.type} - ${jsdoc.returns.description}\n\n`;
		}

		// Add example placeholder
		markdown += `**Example:**\n\`\`\`js\nimport { ${name} } from '@mhkeller/utils/scrape'\n\n// Usage example for ${name}\n\`\`\`\n\n`;
	});

	writeFileSync(join(docsDir, 'api', 'scraping.md'), markdown);
	console.log(`✅ Generated scraping docs (${scrapeFunctions.length} functions)`);
}

function generateApiIndex() {
	const markdown = `# API Reference

This section contains detailed documentation for all functions in @mhkeller/utils, organized by category.

## Categories

- **[Array & Object Utils](./array-object)** - Functions for working with arrays, objects, and data structures
- **[String Utils](./string)** - Functions for string manipulation and formatting
- **[Number Utils](./number)** - Functions for number formatting and mathematical operations
- **[Time & Progress](./time-progress)** - Functions for time handling, delays, and progress tracking
- **[File & Data](./file-data)** - Functions for reading, writing, and processing data files
- **[General Utilities](./utilities)** - Miscellaneous utility functions
- **[Database Functions](./database)** - PostgreSQL utilities and helpers
- **[SQLite Functions](./sqlite)** - SQLite database utilities
- **[Web Scraping](./scraping)** - Browser automation and screenshot tools

## Quick Reference

All functions are exported from the main module:

\`\`\`js
import {
  commas, sleep, initLogProgress,
  readXlsx, writeSync, checkIsTrue
} from '@mhkeller/utils'
\`\`\`

Database and scraping functions are in separate modules:

\`\`\`js
import { uploadRows, setTableUpload } from '@mhkeller/utils/db'
import { launchBrowser, screenshotPage } from '@mhkeller/utils/scrape'
\`\`\`

_Note: All functions within each category are listed alphabetically for easy reference._
`;

	writeFileSync(join(docsDir, 'api', 'index.md'), markdown);
	console.log('✅ Generated API index');
}

// Main execution
async function main() {
	console.log('🚀 Generating API documentation...');

	// Generate category documentation
	for (const [categoryKey, category] of Object.entries(categories)) {
		generateCategoryDocs(categoryKey, category);
	}

	// Generate specialized documentation
	generateDatabaseDocs();
	generateSQLiteDocs();
	generateScrapingDocs();
	generateApiIndex();

	console.log('\n🎉 Documentation generation complete!');
	console.log('📝 Functions are now organized alphabetically within each category');
}

main().catch(console.error);
