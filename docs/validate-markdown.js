#!/usr/bin/env node

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const docsApiDir = './docs/api';

console.log('Validating markdown files for VitePress compatibility...');

function validateMarkdown(filePath) {
	const content = readFileSync(filePath, 'utf-8');
	const issues = [];

	// Check for unescaped angle brackets that might be interpreted as Vue components
	const angleMatches = content.match(/<[^/>][^>]*>/g);
	if (angleMatches) {
		const problematicMatches = angleMatches.filter(
			match =>
				!match.startsWith('<code>') &&
				!match.startsWith('</code>') &&
				!match.startsWith('<a ') &&
				!match.startsWith('</a>') &&
				!match.startsWith('<em>') &&
				!match.startsWith('</em>') &&
				!match.startsWith('<strong>') &&
				!match.startsWith('</strong>')
		);
		if (problematicMatches.length > 0) {
			issues.push(`Found potentially problematic angle brackets: ${problematicMatches.join(', ')}`);
		}
	}

	// Check for HTML entities that might cause issues
	const htmlEntities = content.match(/&[a-zA-Z0-9#]+;/g);
	if (htmlEntities) {
		issues.push(`Found HTML entities: ${htmlEntities.join(', ')}`);
	}

	// Check for unmatched backticks in code blocks
	const codeBlockMatches = content.match(/```/g);
	if (codeBlockMatches && codeBlockMatches.length % 2 !== 0) {
		issues.push('Unmatched code block backticks');
	}

	return issues;
}

try {
	const files = readdirSync(docsApiDir)
		.filter(file => file.endsWith('.md'))
		.map(file => join(docsApiDir, file));

	let totalIssues = 0;

	for (const file of files) {
		const issues = validateMarkdown(file);
		if (issues.length > 0) {
			console.log(`\n❌ ${file}:`);
			issues.forEach(issue => console.log(`  - ${issue}`));
			totalIssues += issues.length;
		} else {
			console.log(`✅ ${file} - OK`);
		}
	}

	if (totalIssues === 0) {
		console.log('\n🎉 All markdown files are valid!');
	} else {
		console.log(`\n⚠️  Found ${totalIssues} potential issue(s) across ${files.length} files`);
	}
} catch (error) {
	console.error('Error validating files:', error.message);
}
