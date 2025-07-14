import { describe, it, expect, vi } from 'vitest';
import getNow from '../lib/getNow.js';

describe('getNow', () => {
	it('should return a string', () => {
		const result = getNow();
		expect(typeof result).toBe('string');
	});

	it('should return ISO string with colons replaced by dashes', () => {
		const result = getNow();

		// Should be in format like: 2023-07-13T14-30-45.123Z
		expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.\d{3}Z$/);
	});

	it('should not contain colons', () => {
		const result = getNow();
		expect(result).not.toContain(':');
	});

	it('should return different values when called at different times', async () => {
		const result1 = getNow();
		// Wait a small amount to ensure different timestamps
		await new Promise(resolve => setTimeout(resolve, 2));
		const result2 = getNow();

		expect(result1).not.toBe(result2);
	});

	it('should be based on current time', () => {
		const mockDate = new Date('2023-07-13T14:30:45.123Z');
		vi.spyOn(global, 'Date').mockImplementation(() => mockDate);

		const result = getNow();
		expect(result).toBe('2023-07-13T14-30-45.123Z');

		vi.restoreAllMocks();
	});

	it('should handle different date formats consistently', () => {
		const testDates = [
			new Date('2023-01-01T00:00:00.000Z'),
			new Date('2023-12-31T23:59:59.999Z'),
			new Date('2023-06-15T12:30:45.500Z')
		];

		testDates.forEach(mockDate => {
			vi.spyOn(global, 'Date').mockImplementation(() => mockDate);

			const result = getNow();
			const expected = mockDate.toISOString().replaceAll(':', '-');
			expect(result).toBe(expected);

			vi.restoreAllMocks();
		});
	});
});
