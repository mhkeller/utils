import { describe, it, expect, vi, beforeEach } from 'vitest';
import readXlsx from '../lib/readXlsx.js';

// Mock fs and xlsx
vi.mock('fs', () => ({
	readFileSync: vi.fn()
}));

vi.mock('xlsx/xlsx.mjs', () => ({
	read: vi.fn(),
	utils: {
		sheet_to_json: vi.fn()
	}
}));

describe('readXlsx', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should read first sheet when no sheet name provided', async () => {
		const { readFileSync } = await import('fs');
		const { read, utils } = await import('xlsx/xlsx.mjs');

		const mockBuffer = Buffer.from('fake xlsx data');
		const mockWorkbook = {
			SheetNames: ['Sheet1', 'Sheet2'],
			Sheets: {
				Sheet1: { A1: { v: 'test' } },
				Sheet2: { A1: { v: 'test2' } }
			}
		};
		const mockData = [{ col1: 'value1' }];

		readFileSync.mockReturnValue(mockBuffer);
		read.mockReturnValue(mockWorkbook);
		utils.sheet_to_json.mockReturnValue(mockData);

		const result = readXlsx('/path/to/file.xlsx');

		expect(readFileSync).toHaveBeenCalledWith('/path/to/file.xlsx');
		expect(read).toHaveBeenCalledWith(mockBuffer);
		expect(utils.sheet_to_json).toHaveBeenCalledWith(mockWorkbook.Sheets.Sheet1);
		expect(result).toEqual(mockData);
	});

	it('should read specific sheet when sheet name provided', async () => {
		const { readFileSync } = await import('fs');
		const { read, utils } = await import('xlsx/xlsx.mjs');

		const mockBuffer = Buffer.from('fake xlsx data');
		const mockWorkbook = {
			SheetNames: ['Sheet1', 'Data', 'Summary'],
			Sheets: {
				Sheet1: { A1: { v: 'test1' } },
				Data: { A1: { v: 'data' } },
				Summary: { A1: { v: 'summary' } }
			}
		};
		const mockData = [{ col1: 'data_value' }];

		readFileSync.mockReturnValue(mockBuffer);
		read.mockReturnValue(mockWorkbook);
		utils.sheet_to_json.mockReturnValue(mockData);

		const result = readXlsx('/path/to/file.xlsx', 'Data');

		expect(utils.sheet_to_json).toHaveBeenCalledWith(mockWorkbook.Sheets.Data);
		expect(result).toEqual(mockData);
	});

	it('should handle empty sheets', async () => {
		const { readFileSync } = await import('fs');
		const { read, utils } = await import('xlsx/xlsx.mjs');

		const mockWorkbook = {
			SheetNames: ['EmptySheet'],
			Sheets: {
				EmptySheet: {}
			}
		};

		readFileSync.mockReturnValue(Buffer.from('data'));
		read.mockReturnValue(mockWorkbook);
		utils.sheet_to_json.mockReturnValue([]);

		const result = readXlsx('/path/to/empty.xlsx');

		expect(result).toEqual([]);
	});

	it('should handle complex data structures', async () => {
		const { readFileSync } = await import('fs');
		const { read, utils } = await import('xlsx/xlsx.mjs');

		const mockWorkbook = {
			SheetNames: ['ComplexData'],
			Sheets: {
				ComplexData: { A1: { v: 'header' } }
			}
		};
		const complexData = [
			{ id: 1, name: 'John', data: { age: 30, city: 'NYC' } },
			{ id: 2, name: 'Jane', data: { age: 25, city: 'LA' } }
		];

		readFileSync.mockReturnValue(Buffer.from('data'));
		read.mockReturnValue(mockWorkbook);
		utils.sheet_to_json.mockReturnValue(complexData);

		const result = readXlsx('/path/to/complex.xlsx');

		expect(result).toEqual(complexData);
		expect(result).toHaveLength(2);
		expect(result[0].name).toBe('John');
	});

	it('should work with different file paths', async () => {
		const { readFileSync } = await import('fs');
		const { read, utils } = await import('xlsx/xlsx.mjs');

		const paths = ['/absolute/path/file.xlsx', './relative/path/data.xlsx', 'simple-file.xlsx'];

		const mockWorkbook = {
			SheetNames: ['Sheet1'],
			Sheets: { Sheet1: {} }
		};

		read.mockReturnValue(mockWorkbook);
		utils.sheet_to_json.mockReturnValue([]);

		for (const path of paths) {
			readXlsx(path);
			expect(readFileSync).toHaveBeenCalledWith(path);
		}
	});
});
