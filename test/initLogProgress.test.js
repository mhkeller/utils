import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import initLogProgress from '../lib/initLogProgress.js';

// Mock dependencies
vi.mock('@mhkeller/notify', () => ({
	default: vi.fn()
}));

describe('initLogProgress', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should return a function', () => {
		const logProgress = initLogProgress(10);
		expect(typeof logProgress).toBe('function');
	});

	it('should log progress on first call', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const logProgress = initLogProgress(5, { every: 1 });

		vi.setSystemTime(1000000);
		const result = logProgress();

		expect(result).toBe(true);
		expect(mockNotify.default).toHaveBeenCalledWith({
			m: '\tProcessing...',
			v: '1 / 5',
			d: ['cyan', 'bold']
		});
	});

	it('should respect the every parameter', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const logProgress = initLogProgress(10, { every: 3 });

		vi.setSystemTime(1000000);

		// First call (i=0, should log because 0 % 3 === 0)
		expect(logProgress()).toBe(true);
		expect(mockNotify.default).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(100);

		// Second call (i=1, should not log because 1 % 3 !== 0)
		expect(logProgress()).toBe(false);
		expect(mockNotify.default).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(100);

		// Third call (i=2, should not log because 2 % 3 !== 0)
		expect(logProgress()).toBe(false);
		expect(mockNotify.default).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(100);

		// Fourth call (i=3, should log because 3 % 3 === 0)
		expect(logProgress()).toBe(true);
		expect(mockNotify.default).toHaveBeenCalledTimes(2);
	});

	it('should always log on the last iteration', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const logProgress = initLogProgress(5, { every: 3 });

		vi.setSystemTime(1000000);

		// Call all iterations
		logProgress(); // i=0, logs (0 % 3 === 0)
		vi.advanceTimersByTime(100);
		logProgress(); // i=1, doesn't log
		vi.advanceTimersByTime(100);
		logProgress(); // i=2, doesn't log
		vi.advanceTimersByTime(100);
		logProgress(); // i=3, logs (3 % 3 === 0)
		vi.advanceTimersByTime(100);
		const result = logProgress(); // i=4, logs (last iteration)

		expect(result).toBe(true);
		expect(mockNotify.default).toHaveBeenCalledTimes(3); // 0, 3, and 4 (last)
	});

	it('should use custom message and indent', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const logProgress = initLogProgress(3);

		vi.setSystemTime(1000000);
		logProgress({ msg: 'Custom message', indent: 2 });

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: '\t\tCustom message',
			v: '1 / 3',
			d: ['cyan', 'bold']
		});
	});

	it('should calculate and show time estimates', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const logProgress = initLogProgress(4, { every: 1 });

		vi.setSystemTime(1000000);
		logProgress(); // First call, no time estimate

		vi.advanceTimersByTime(1000); // 1 second per iteration
		logProgress(); // Second call, should estimate time left

		expect(mockNotify.default).toHaveBeenLastCalledWith(
			expect.objectContaining({
				v: expect.stringMatching(/2 \/ 4.*left/)
			})
		);
	});

	it('should show rate when enabled', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const logProgress = initLogProgress(3, { every: 1 });

		vi.setSystemTime(1000000);
		logProgress(); // First call

		vi.advanceTimersByTime(500); // 0.5 seconds = 2/sec rate
		logProgress({ showRate: true }); // Second call with rate

		expect(mockNotify.default).toHaveBeenLastCalledWith(
			expect.objectContaining({
				v: expect.stringContaining('/sec')
			})
		);
	});

	it('should handle default options', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const logProgress = initLogProgress(5); // No options

		vi.setSystemTime(1000000);
		logProgress(); // No options

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: '\tProcessing...',
			v: '1 / 5',
			d: ['cyan', 'bold']
		});
	});

	it('should format large numbers with commas', async () => {
		const mockNotify = await import('@mhkeller/notify');
		const logProgress = initLogProgress(1234567);

		vi.setSystemTime(1000000);
		logProgress();

		expect(mockNotify.default).toHaveBeenCalledWith(
			expect.objectContaining({
				v: expect.stringContaining('1,234,567')
			})
		);
	});
});
