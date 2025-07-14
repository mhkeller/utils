import { describe, it, expect, vi, beforeEach } from 'vitest';
import writeSync from '../lib/writeSync.js';

// Mock the indian-ocean module
vi.mock('indian-ocean', () => ({
	writeDataSync: vi.fn()
}));

// Mock the notify function
vi.mock('@mhkeller/notify', () => ({
	default: vi.fn()
}));

describe('writeSync', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should write data and log success message', async () => {
		const { writeDataSync } = await import('indian-ocean');
		const mockNotify = await import('@mhkeller/notify');

		const data = [{ id: 1, name: 'test' }];
		const outpath = '/path/to/file.json';

		writeSync(outpath, data);

		expect(writeDataSync).toHaveBeenCalledWith(outpath, data, {
			makeDirs: true,
			indent: undefined
		});
		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Wrote...',
			v: `${outpath} (1 rows)`,
			d: ['green', 'bold']
		});
	});

	it('should handle array data with row count', async () => {
		const mockNotify = await import('@mhkeller/notify');

		const data = [1, 2, 3, 4, 5];
		const outpath = '/path/to/file.json';

		writeSync(outpath, data);

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Wrote...',
			v: `${outpath} (5 rows)`,
			d: ['green', 'bold']
		});
	});

	it('should handle non-array data without row count', async () => {
		const mockNotify = await import('@mhkeller/notify');

		const data = { name: 'test', value: 123 };
		const outpath = '/path/to/file.json';

		writeSync(outpath, data);

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Wrote...',
			v: outpath,
			d: ['green', 'bold']
		});
	});

	it('should pass indent option to writeDataSync', async () => {
		const { writeDataSync } = await import('indian-ocean');

		const data = { test: 'data' };
		const outpath = '/path/to/file.json';
		const options = { indent: 2 };

		writeSync(outpath, data, options);

		expect(writeDataSync).toHaveBeenCalledWith(outpath, data, { makeDirs: true, indent: 2 });
	});

	it('should handle logIndent option', async () => {
		const mockNotify = await import('@mhkeller/notify');

		const data = [1, 2, 3];
		const outpath = '/path/to/file.json';
		const options = { logIndent: 2 };

		writeSync(outpath, data, options);

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: '\t\tWrote...',
			v: `${outpath} (3 rows)`,
			d: ['green', 'bold']
		});
	});

	it('should handle empty arrays', async () => {
		const mockNotify = await import('@mhkeller/notify');

		const data = [];
		const outpath = '/path/to/file.json';

		writeSync(outpath, data);

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Wrote...',
			v: `${outpath} (0 rows)`,
			d: ['green', 'bold']
		});
	});

	it('should handle large arrays with comma formatting', async () => {
		const mockNotify = await import('@mhkeller/notify');

		const data = new Array(1234567).fill(0);
		const outpath = '/path/to/file.json';

		writeSync(outpath, data);

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Wrote...',
			v: `${outpath} (1,234,567 rows)`,
			d: ['green', 'bold']
		});
	});

	it('should work with default options', async () => {
		const { writeDataSync } = await import('indian-ocean');
		const mockNotify = await import('@mhkeller/notify');

		const data = { test: 'data' };
		const outpath = '/path/to/file.json';

		writeSync(outpath, data);

		expect(writeDataSync).toHaveBeenCalledWith(outpath, data, {
			makeDirs: true,
			indent: undefined
		});
		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Wrote...',
			v: outpath,
			d: ['green', 'bold']
		});
	});
});
