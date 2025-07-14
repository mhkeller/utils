import { describe, it, expect, vi, beforeEach } from 'vitest';
import getTodo from '../lib/getTodo.js';
import { existsSync } from 'node:fs';

// Mock the filesystem and notify
vi.mock('node:fs', () => ({
	existsSync: vi.fn()
}));

vi.mock('@mhkeller/notify', () => ({
	default: vi.fn()
}));

describe('getTodo', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should filter out existing files', async () => {
		const mockExistsSync = vi.mocked(existsSync);
		mockExistsSync.mockImplementation(path => {
			return path === 'file1.txt' || path === 'file3.txt';
		});

		const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
		const result = getTodo(files);

		expect(result).toEqual(['file2.txt', 'file4.txt']);
	});

	it('should use custom exists function', async () => {
		const mockExistsSync = vi.mocked(existsSync);
		mockExistsSync.mockImplementation(path => {
			return path === '/data/item1.json' || path === '/data/item3.json';
		});

		const files = [
			{ id: 'item1', name: 'First' },
			{ id: 'item2', name: 'Second' },
			{ id: 'item3', name: 'Third' }
		];

		const exists = item => `/data/${item.id}.json`;
		const result = getTodo(files, exists);

		expect(result).toEqual([{ id: 'item2', name: 'Second' }]);
		expect(mockExistsSync).toHaveBeenCalledWith('/data/item1.json');
		expect(mockExistsSync).toHaveBeenCalledWith('/data/item2.json');
		expect(mockExistsSync).toHaveBeenCalledWith('/data/item3.json');
	});

	it('should handle empty arrays', async () => {
		const result = getTodo([]);
		expect(result).toEqual([]);
	});

	it('should return all files when none exist', async () => {
		const mockExistsSync = vi.mocked(existsSync);
		mockExistsSync.mockReturnValue(false);

		const files = ['file1.txt', 'file2.txt', 'file3.txt'];
		const result = getTodo(files);

		expect(result).toEqual(files);
	});

	it('should return empty array when all files exist', async () => {
		const mockExistsSync = vi.mocked(existsSync);
		mockExistsSync.mockReturnValue(true);

		const files = ['file1.txt', 'file2.txt', 'file3.txt'];
		const result = getTodo(files);

		expect(result).toEqual([]);
	});

	it('should log found and todo counts', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const mockExistsSync = vi.mocked(existsSync);
		mockExistsSync.mockReturnValue(false);

		const files = ['file1.txt', 'file2.txt', 'file3.txt'];
		getTodo(files);

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Found...',
			v: '3',
			d: 'group'
		});

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Todo... ',
			v: '3',
			d: ['magenta', 'bold', 'underline']
		});
	});

	it('should handle large numbers with comma formatting', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const mockExistsSync = vi.mocked(existsSync);
		mockExistsSync.mockReturnValue(false);

		const files = new Array(1234).fill('file.txt');
		getTodo(files);

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Found...',
			v: '1,234',
			d: 'group'
		});
	});

	it('should work with different data types', async () => {
		const mockExistsSync = vi.mocked(existsSync);
		mockExistsSync.mockImplementation(path => path === 'path1');

		const files = [{ data: 'item1' }, { data: 'item2' }, { data: 'item3' }];

		const exists = item => (item.data === 'item1' ? 'path1' : 'path2');
		const result = getTodo(files, exists);

		expect(result).toEqual([{ data: 'item2' }, { data: 'item3' }]);
	});
});
