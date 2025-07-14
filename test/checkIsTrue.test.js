import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import checkIsTrue from '../lib/checkIsTrue.js';

// Mock the notify function and process.exit
vi.mock('@mhkeller/notify', () => ({
	default: vi.fn()
}));

const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
	throw new Error('process.exit called');
});

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('checkIsTrue', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterAll(() => {
		mockExit.mockRestore();
		mockConsoleLog.mockRestore();
	});

	it('should do nothing when condition is true', () => {
		expect(() => {
			checkIsTrue({
				condition: true,
				msg: 'Test message',
				value: 'test value'
			});
		}).not.toThrow();

		expect(mockExit).not.toHaveBeenCalled();
		expect(mockConsoleLog).not.toHaveBeenCalled();
	});

	it('should exit when condition is false', async () => {
		const mockNotify = await import('@mhkeller/notify');

		expect(() => {
			checkIsTrue({
				condition: false,
				msg: 'Test failed',
				value: { test: 'data' }
			});
		}).toThrow('process.exit called');

		expect(mockNotify.default).toHaveBeenCalledWith({
			m: 'Test failed:',
			v: JSON.stringify({ test: 'data' }, null, 2),
			d: ['bold', 'red']
		});
		expect(mockExit).toHaveBeenCalledWith(1);
	});

	it('should log context when provided', async () => {
		const context = { additional: 'context info' };

		expect(() => {
			checkIsTrue({
				condition: false,
				msg: 'Test failed',
				value: 'test value',
				context
			});
		}).toThrow('process.exit called');

		expect(mockConsoleLog).toHaveBeenCalledWith(context);
	});

	it('should handle various value types', async () => {
		const testCases = [
			'string value',
			123,
			true,
			null,
			undefined,
			{ complex: 'object' },
			[1, 2, 3]
		];

		for (const value of testCases) {
			expect(() => {
				checkIsTrue({
					condition: false,
					msg: 'Test',
					value
				});
			}).toThrow('process.exit called');
		}
	});

	it('should work with falsy conditions', async () => {
		const falsyValues = [false, 0, '', null, undefined, NaN];

		for (const condition of falsyValues) {
			expect(() => {
				checkIsTrue({
					condition,
					msg: 'Falsy test',
					value: `Testing ${condition}`
				});
			}).toThrow('process.exit called');
		}
	});

	it('should work with truthy conditions', () => {
		const truthyValues = [true, 1, 'non-empty', {}, [], () => {}];

		for (const condition of truthyValues) {
			expect(() => {
				checkIsTrue({
					condition,
					msg: 'Truthy test',
					value: `Testing ${condition}`
				});
			}).not.toThrow();
		}
	});
});
