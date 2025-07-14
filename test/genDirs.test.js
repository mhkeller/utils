import { describe, it, expect } from 'vitest';
import genDirs from '../lib/genDirs.js';
import { fileURLToPath } from 'node:url';

describe('genDirs', () => {
	it('should generate input and output directories from import meta', () => {
		const mockImportMeta = {
			url: 'file:///path/to/script_test.js'
		};

		const result = genDirs(mockImportMeta);

		expect(result).toEqual({
			inDir: 'in/script_in',
			outDir: 'out/script_out'
		});
	});

	it('should handle file names with underscores correctly', () => {
		const mockImportMeta = {
			url: 'file:///path/to/my_complex_script_name.js'
		};

		const result = genDirs(mockImportMeta);

		expect(result).toEqual({
			inDir: 'in/my_in',
			outDir: 'out/my_out'
		});
	});

	it('should work with baseDir parameter', () => {
		const mockImportMeta = {
			url: 'file:///path/to/script_test.js'
		};

		const result = genDirs(mockImportMeta, '/base/directory');

		expect(result).toEqual({
			inDir: '/base/directory/in/script_in',
			outDir: '/base/directory/out/script_out'
		});
	});

	it('should handle empty baseDir (default)', () => {
		const mockImportMeta = {
			url: 'file:///path/to/script_test.js'
		};

		const result = genDirs(mockImportMeta, '');

		expect(result).toEqual({
			inDir: 'in/script_in',
			outDir: 'out/script_out'
		});
	});

	it('should handle Windows-style file URLs', () => {
		const mockImportMeta = {
			url: 'file:///C:/path/to/my_script.js'
		};

		const result = genDirs(mockImportMeta);

		expect(result).toEqual({
			inDir: 'in/my_in',
			outDir: 'out/my_out'
		});
	});

	it('should handle file names without underscores', () => {
		const mockImportMeta = {
			url: 'file:///path/to/script.js'
		};

		const result = genDirs(mockImportMeta);

		expect(result).toEqual({
			inDir: 'in/script.js_in', // basename includes extension when no underscore
			outDir: 'out/script.js_out'
		});
	});

	it('should handle file names with multiple underscores', () => {
		const mockImportMeta = {
			url: 'file:///path/to/very_long_script_name_with_many_parts.js'
		};

		const result = genDirs(mockImportMeta);

		// Should take only the first part (before first underscore)
		expect(result).toEqual({
			inDir: 'in/very_in',
			outDir: 'out/very_out'
		});
	});

	it('should work with different file extensions', () => {
		const extensions = ['.ts', '.mjs', '.cjs'];

		extensions.forEach(ext => {
			const mockImportMeta = {
				url: `file:///path/to/script_test${ext}`
			};

			const result = genDirs(mockImportMeta);

			expect(result).toEqual({
				inDir: 'in/script_in',
				outDir: 'out/script_out'
			});
		});
	});

	it('should handle complex paths', () => {
		const mockImportMeta = {
			url: 'file:///very/deep/nested/path/to/my_processing_script.js'
		};

		const result = genDirs(mockImportMeta, './base');

		expect(result).toEqual({
			inDir: 'base/in/my_in', // path.join normalizes the path
			outDir: 'base/out/my_out'
		});
	});

	it('should work with relative baseDir paths', () => {
		const mockImportMeta = {
			url: 'file:///path/to/data_processor.js'
		};

		const result = genDirs(mockImportMeta, '../data');

		expect(result).toEqual({
			inDir: '../data/in/data_in',
			outDir: '../data/out/data_out'
		});
	});
});
