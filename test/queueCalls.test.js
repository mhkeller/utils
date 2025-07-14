import { describe, it, expect, vi } from 'vitest';
import queueCalls from '../lib/queueCalls.js';

describe('queueCalls', () => {
	it('should process all items', async () => {
		const items = [1, 2, 3, 4, 5];
		const fn = vi.fn().mockImplementation(async item => item * 2);

		const results = await queueCalls(items, fn);

		expect(results).toEqual([2, 4, 6, 8, 10]);
		expect(fn).toHaveBeenCalledTimes(5);
	});

	it('should pass correct parameters to function', async () => {
		const items = ['a', 'b', 'c'];
		const fn = vi.fn().mockResolvedValue('result');

		await queueCalls(items, fn);

		expect(fn).toHaveBeenNthCalledWith(1, 'a', 0, 3);
		expect(fn).toHaveBeenNthCalledWith(2, 'b', 1, 3);
		expect(fn).toHaveBeenNthCalledWith(3, 'c', 2, 3);
	});

	it('should handle empty arrays', async () => {
		const fn = vi.fn();

		const results = await queueCalls([], fn);

		expect(results).toEqual([]);
		expect(fn).not.toHaveBeenCalled();
	});

	it('should maintain order of results', async () => {
		const items = [1, 2, 3];
		const fn = vi.fn().mockImplementation(async item => {
			// Add random delay to test order preservation
			await new Promise(resolve => setTimeout(resolve, Math.random() * 10));
			return `result-${item}`;
		});

		const results = await queueCalls(items, fn);

		expect(results).toEqual(['result-1', 'result-2', 'result-3']);
	});

	it('should handle async functions', async () => {
		const items = [10, 20, 30];
		const fn = async item => {
			await new Promise(resolve => setTimeout(resolve, 1));
			return item + 5;
		};

		const results = await queueCalls(items, fn);

		expect(results).toEqual([15, 25, 35]);
	});

	it('should handle errors in individual calls', async () => {
		const items = [1, 2, 3];
		const fn = vi.fn().mockImplementation(async item => {
			if (item === 2) {
				throw new Error(`Error for item ${item}`);
			}
			return item * 2;
		});

		await expect(queueCalls(items, fn)).rejects.toThrow('Error for item 2');
	});

	it('should respect concurrency limit', async () => {
		const items = [1, 2, 3, 4, 5];
		let activeCount = 0;
		let maxActiveCount = 0;

		const fn = async item => {
			activeCount++;
			maxActiveCount = Math.max(maxActiveCount, activeCount);
			await new Promise(resolve => setTimeout(resolve, 10));
			activeCount--;
			return item;
		};

		await queueCalls(items, fn, 2);

		expect(maxActiveCount).toBeLessThanOrEqual(2);
	});

	it('should work with default concurrency (Infinity)', async () => {
		const items = [1, 2, 3];
		const fn = vi.fn().mockImplementation(async item => item);

		const results = await queueCalls(items, fn);

		expect(results).toEqual([1, 2, 3]);
		expect(fn).toHaveBeenCalledTimes(3);
	});

	it('should handle different data types', async () => {
		const items = [
			{ id: 1, name: 'test1' },
			{ id: 2, name: 'test2' },
			{ id: 3, name: 'test3' }
		];
		const fn = async item => item.name.toUpperCase();

		const results = await queueCalls(items, fn);

		expect(results).toEqual(['TEST1', 'TEST2', 'TEST3']);
	});

	it('should work with concurrency of 1 (sequential)', async () => {
		const items = [1, 2, 3];
		const callOrder = [];
		const fn = async item => {
			callOrder.push(`start-${item}`);
			await new Promise(resolve => setTimeout(resolve, 5));
			callOrder.push(`end-${item}`);
			return item;
		};

		await queueCalls(items, fn, 1);

		// With concurrency 1, should be fully sequential
		expect(callOrder).toEqual(['start-1', 'end-1', 'start-2', 'end-2', 'start-3', 'end-3']);
	});
});
