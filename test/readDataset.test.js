import { describe, it, expect, vi } from 'vitest';
import readDataset from '../lib/readDataset.js';

// Mock indian-ocean
vi.mock('indian-ocean', () => ({
	readDataSync: vi.fn()
}));

describe('readDataset', () => {
	it('should read data and return filepath and data', async () => {
		const { readDataSync } = await import('indian-ocean');
		const mockData = [{ id: 1, name: 'test' }];
		readDataSync.mockReturnValue(mockData);

		const result = readDataset('/path/to/file.json');

		expect(readDataSync).toHaveBeenCalledWith('/path/to/file.json');
		expect(result).toEqual({
			filepath: '/path/to/file.json',
			data: mockData
		});
	});

	it('should work with different file paths', async () => {
		const { readDataSync } = await import('indian-ocean');
		const mockData = [{ a: 1, b: 2 }];
		readDataSync.mockReturnValue(mockData);

		const result = readDataset('./data/test.csv');

		expect(readDataSync).toHaveBeenCalledWith('./data/test.csv');
		expect(result.filepath).toBe('./data/test.csv');
		expect(result.data).toEqual(mockData);
	});

	it('should preserve the original data structure', async () => {
		const { readDataSync } = await import('indian-ocean');
		const complexData = {
			metadata: { version: '1.0' },
			records: [
				{ id: 1, nested: { value: 'test' } },
				{ id: 2, nested: { value: 'test2' } }
			]
		};
		readDataSync.mockReturnValue(complexData);

		const result = readDataset('/complex/data.json');

		expect(result.data).toEqual(complexData);
		expect(result.data.metadata.version).toBe('1.0');
		expect(result.data.records).toHaveLength(2);
	});

	it('should handle empty data', async () => {
		const { readDataSync } = await import('indian-ocean');
		readDataSync.mockReturnValue([]);

		const result = readDataset('/empty/file.json');

		expect(result).toEqual({
			filepath: '/empty/file.json',
			data: []
		});
	});
});
