import { describe, it, expect, vi, beforeEach } from 'vitest';
import paginatedFetcher from '../lib/paginatedFetcher.js';

// Mock dependencies
vi.mock('@mhkeller/notify', () => ({
	default: vi.fn()
}));

vi.mock('../lib/fetchData.js', () => ({
	default: vi.fn()
}));

vi.mock('../lib/sleep.js', () => ({
	default: vi.fn().mockResolvedValue()
}));

describe('paginatedFetcher', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should create a fetcher function', () => {
		const fetcher = paginatedFetcher({
			isOk: () => true,
			getItems: () => [],
			getNext: () => null,
			getTotal: () => 0,
			pageSize: 10
		});

		expect(typeof fetcher).toBe('function');
	});

	it('should fetch single page when no next page', async () => {
		const mockFetchData = await import('../lib/fetchData.js');
		const mockNotify = await import('@mhkeller/notify');

		const mockResponse = {
			data: [{ id: 1 }, { id: 2 }],
			total: 2
		};

		mockFetchData.default.mockResolvedValue(mockResponse);

		const fetcher = paginatedFetcher({
			isOk: response => !!response.data,
			getItems: response => response.data,
			getNext: () => null,
			getTotal: response => response.total,
			pageSize: 10
		});

		const result = await fetcher('http://api.example.com/data');

		expect(result).toEqual([{ id: 1 }, { id: 2 }]);
		expect(mockFetchData.default).toHaveBeenCalledTimes(1);
		expect(mockFetchData.default).toHaveBeenCalledWith('http://api.example.com/data');
	});

	it('should fetch multiple pages', async () => {
		const mockFetchData = await import('../lib/fetchData.js');
		const mockSleep = await import('../lib/sleep.js');

		const page1Response = {
			data: [{ id: 1 }, { id: 2 }],
			total: 4,
			nextUrl: 'http://api.example.com/data?page=2'
		};

		const page2Response = {
			data: [{ id: 3 }, { id: 4 }],
			total: 4,
			nextUrl: null
		};

		mockFetchData.default.mockResolvedValueOnce(page1Response).mockResolvedValueOnce(page2Response);

		const fetcher = paginatedFetcher({
			isOk: response => !!response.data,
			getItems: response => response.data,
			getNext: response => response.nextUrl,
			getTotal: response => response.total,
			pageSize: 2,
			sleepTime: 500
		});

		const result = await fetcher('http://api.example.com/data?page=1');

		expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
		expect(mockFetchData.default).toHaveBeenCalledTimes(2);
		expect(mockSleep.default).toHaveBeenCalledWith(500, { indent: 3 });
	});

	it('should handle API errors gracefully', async () => {
		const mockFetchData = await import('../lib/fetchData.js');
		const mockNotify = await import('@mhkeller/notify');

		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		mockFetchData.default.mockRejectedValue(new Error('API Error'));

		const fetcher = paginatedFetcher({
			isOk: response => !!response.data,
			getItems: response => response.data || [],
			getNext: () => null,
			getTotal: () => 0,
			pageSize: 10
		});

		const result = await fetcher('http://api.example.com/data');

		expect(result).toEqual([]);
		expect(mockNotify.default).toHaveBeenCalledWith(
			expect.objectContaining({
				m: expect.stringContaining('An error occurred during fetching')
			})
		);
		expect(consoleErrorSpy).toHaveBeenCalled();

		consoleErrorSpy.mockRestore();
	});

	it('should handle invalid response structure', async () => {
		const mockFetchData = await import('../lib/fetchData.js');
		const mockNotify = await import('@mhkeller/notify');

		const invalidResponse = { error: 'Bad request' };
		mockFetchData.default.mockResolvedValue(invalidResponse);

		const fetcher = paginatedFetcher({
			isOk: response => !!response.data,
			getItems: response => response.data || [],
			getNext: () => null,
			getTotal: () => 0,
			pageSize: 10
		});

		const result = await fetcher('http://api.example.com/data');

		expect(result).toEqual([]);
		expect(mockNotify.default).toHaveBeenCalledWith(
			expect.objectContaining({
				m: expect.stringContaining('Unexpected response structure')
			})
		);
	});

	it('should use custom sleep time', async () => {
		const mockFetchData = await import('../lib/fetchData.js');
		const mockSleep = await import('../lib/sleep.js');

		const page1 = { data: [1], nextUrl: 'page2' };
		const page2 = { data: [2], nextUrl: null };

		mockFetchData.default.mockResolvedValueOnce(page1).mockResolvedValueOnce(page2);

		const fetcher = paginatedFetcher({
			isOk: () => true,
			getItems: r => r.data,
			getNext: r => r.nextUrl,
			getTotal: () => 2,
			pageSize: 1,
			sleepTime: 2000
		});

		await fetcher('url');

		expect(mockSleep.default).toHaveBeenCalledWith(2000, { indent: 3 });
	});

	it('should accumulate results correctly', async () => {
		const mockFetchData = await import('../lib/fetchData.js');

		const pages = [
			{ data: ['a', 'b'], nextUrl: 'page2' },
			{ data: ['c', 'd'], nextUrl: 'page3' },
			{ data: ['e'], nextUrl: null }
		];

		mockFetchData.default
			.mockResolvedValueOnce(pages[0])
			.mockResolvedValueOnce(pages[1])
			.mockResolvedValueOnce(pages[2]);

		const fetcher = paginatedFetcher({
			isOk: () => true,
			getItems: r => r.data,
			getNext: r => r.nextUrl,
			getTotal: () => 5,
			pageSize: 2
		});

		const result = await fetcher('start-url', ['initial']);

		expect(result).toEqual(['initial', 'a', 'b', 'c', 'd', 'e']);
	});
});
