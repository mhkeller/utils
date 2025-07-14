import { describe, it, expect, vi } from 'vitest';
import sleep from '../lib/sleep.js';

// Mock the notify function
vi.mock('@mhkeller/notify', () => ({
	default: vi.fn()
}));

describe('sleep', () => {
	it('should return a promise that resolves after specified time', async () => {
		const start = Date.now();
		await sleep(100, { log: false });
		const end = Date.now();

		// Allow some tolerance for timing
		expect(end - start).toBeGreaterThanOrEqual(90);
		expect(end - start).toBeLessThan(150);
	});

	it('should resolve with undefined', async () => {
		const result = await sleep(10, { log: false });
		expect(result).toBeUndefined();
	});

	it('should add jitter when specified', async () => {
		const start = Date.now();
		await sleep(100, { log: false, jitter: 50 });
		const end = Date.now();

		// With 50ms jitter, time should be between 100-150ms (plus some tolerance)
		expect(end - start).toBeGreaterThanOrEqual(90);
		expect(end - start).toBeLessThan(200);
	});

	it('should handle zero milliseconds', async () => {
		const start = Date.now();
		await sleep(0, { log: false });
		const end = Date.now();

		// Should complete very quickly
		expect(end - start).toBeLessThan(50);
	});

	it('should work with default options', async () => {
		// This will log, but we just test it doesn't throw
		const promise = sleep(10);
		expect(promise).toBeInstanceOf(Promise);
		await promise;
	});

	it('should handle logging with indent', async () => {
		// Just test it doesn't throw when logging with indent
		await sleep(10, { log: true, indent: 2 });
	});

	it('should not log when log is false', async () => {
		const mockNotify = await import('@mhkeller/notify');
		vi.clearAllMocks();

		await sleep(10, { log: false });

		expect(mockNotify.default).not.toHaveBeenCalled();
	});

	it('should work with very small sleep times', async () => {
		const start = Date.now();
		await sleep(1, { log: false });
		const end = Date.now();

		expect(end - start).toBeGreaterThanOrEqual(0);
	});
});
