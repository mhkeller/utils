import { describe, it, expect, vi, beforeEach } from 'vitest';
import sleepEvery from '../lib/sleepEvery.js';

// Mock the sleep function
vi.mock('../lib/sleep.js', () => ({
	default: vi.fn().mockResolvedValue(undefined)
}));

describe('sleepEvery', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should not sleep on first iteration (i=0)', async () => {
		const mockSleep = await import('../lib/sleep.js');

		await sleepEvery(3, 100, 0);

		expect(mockSleep.default).not.toHaveBeenCalled();
	});

	it('should not sleep when i is not divisible by n', async () => {
		const mockSleep = await import('../lib/sleep.js');

		await sleepEvery(3, 100, 1);
		await sleepEvery(3, 100, 2);
		await sleepEvery(3, 100, 4);
		await sleepEvery(3, 100, 5);

		expect(mockSleep.default).not.toHaveBeenCalled();
	});

	it('should sleep when i is divisible by n (and i > 0)', async () => {
		const mockSleep = await import('../lib/sleep.js');

		await sleepEvery(3, 100, 3);

		expect(mockSleep.default).toHaveBeenCalledOnce();
		expect(mockSleep.default).toHaveBeenCalledWith(100, undefined);
	});

	it('should sleep at correct intervals', async () => {
		const mockSleep = await import('../lib/sleep.js');

		// Test n=2, should sleep at i=2, 4, 6, etc.
		for (let i = 0; i <= 10; i++) {
			await sleepEvery(2, 50, i);
		}

		expect(mockSleep.default).toHaveBeenCalledTimes(5); // i=2,4,6,8,10
		expect(mockSleep.default).toHaveBeenCalledWith(50, undefined);
	});

	it('should pass options to sleep function', async () => {
		const mockSleep = await import('../lib/sleep.js');
		const options = { log: false, indent: 2, jitter: 10 };

		await sleepEvery(2, 100, 4, options);

		expect(mockSleep.default).toHaveBeenCalledWith(100, options);
	});

	it('should throw error for invalid n values', async () => {
		await expect(sleepEvery(0, 100, 1)).rejects.toThrow('n must be a positive integer');
		await expect(sleepEvery(-1, 100, 1)).rejects.toThrow('n must be a positive integer');
		await expect(sleepEvery(1.5, 100, 1)).rejects.toThrow('n must be a positive integer');
	});

	it('should work with n=1 (sleep every iteration after first)', async () => {
		const mockSleep = await import('../lib/sleep.js');

		await sleepEvery(1, 100, 0); // No sleep
		await sleepEvery(1, 100, 1); // Sleep
		await sleepEvery(1, 100, 2); // Sleep

		expect(mockSleep.default).toHaveBeenCalledTimes(2);
	});

	it('should handle large iteration numbers', async () => {
		const mockSleep = await import('../lib/sleep.js');

		await sleepEvery(100, 50, 200); // 200 % 100 === 0
		await sleepEvery(100, 50, 300); // 300 % 100 === 0
		await sleepEvery(100, 50, 250); // 250 % 100 !== 0

		expect(mockSleep.default).toHaveBeenCalledTimes(2);
	});

	it('should return a promise that resolves', async () => {
		const result = await sleepEvery(3, 100, 1);
		expect(result).toBeUndefined();
	});
});
