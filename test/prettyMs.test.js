import { describe, it, expect } from 'vitest';
import prettyMs from '../lib/prettyMs.js';

describe('prettyMs', () => {
	it('should format milliseconds correctly', () => {
		expect(prettyMs(500)).toBe('500ms');
		expect(prettyMs(999)).toBe('999ms');
		expect(prettyMs(0)).toBe('0ms');
	});

	it('should format seconds correctly', () => {
		expect(prettyMs(1000)).toBe('1s');
		expect(prettyMs(1500)).toBe('1.5s');
		expect(prettyMs(30000)).toBe('30s');
		expect(prettyMs(59000)).toBe('59s');
	});

	it('should format minutes correctly', () => {
		expect(prettyMs(60000)).toBe('60s');
		expect(prettyMs(90000)).toBe('1.5 mnts');
		expect(prettyMs(120000)).toBe('2 mnts');
		expect(prettyMs(3600000 - 1)).toBe('60 mnts'); // Just under an hour
	});

	it('should format hours correctly', () => {
		expect(prettyMs(3600000)).toBe('60 mnts'); // 1 hour
		expect(prettyMs(7200000)).toBe('2 hrs'); // 2 hours
		expect(prettyMs(5400000)).toBe('1.5 hrs'); // 1.5 hours
		expect(prettyMs(172800000 - 1)).toBe('48 hrs'); // Just under 48 hours
	});
	it('should format days correctly', () => {
		expect(prettyMs(172800001)).toBe('2 days'); // Just over 48 hours (48 hours + 1ms)
		expect(prettyMs(259200000)).toBe('3 days'); // 3 days
		expect(prettyMs(345600000)).toBe('4 days'); // 4 days
	});

	it('should handle decimal precision', () => {
		expect(prettyMs(1234)).toBe('1.2s');
		expect(prettyMs(61000)).toBe('1 mnts');
		expect(prettyMs(3661000)).toBe('1 hrs'); // 1 hour 1 minute 1 second
	});

	it('should handle edge cases', () => {
		expect(prettyMs(1)).toBe('1ms');
		expect(prettyMs(999.9)).toBe('1000ms');
	});

	it('should handle large numbers', () => {
		const oneWeek = 7 * 24 * 60 * 60 * 1000;
		expect(prettyMs(oneWeek)).toBe('7 days');

		const oneMonth = 30 * 24 * 60 * 60 * 1000;
		expect(prettyMs(oneMonth)).toBe('30 days');
	});

	it('should handle fractional milliseconds', () => {
		expect(prettyMs(0.5)).toBe('1ms'); // Should round up
		expect(prettyMs(1.4)).toBe('1ms'); // Should round down
		expect(prettyMs(1.6)).toBe('2ms'); // Should round up
	});
});
