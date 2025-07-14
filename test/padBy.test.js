import { describe, it, expect } from 'vitest';
import padBy from '../lib/padBy.js';

describe('padBy', () => {
	it('should pad numbers with leading zeros to default length 2', () => {
		expect(padBy(1)).toBe('01');
		expect(padBy(5)).toBe('05');
		expect(padBy(9)).toBe('09');
	});

	it('should pad strings with leading zeros to default length 2', () => {
		expect(padBy('1')).toBe('01');
		expect(padBy('5')).toBe('05');
		expect(padBy('9')).toBe('09');
	});

	it('should pad to custom length', () => {
		expect(padBy(1, 3)).toBe('001');
		expect(padBy(1, 4)).toBe('0001');
		expect(padBy(1, 5)).toBe('00001');
	});

	it('should not pad if value already meets or exceeds length', () => {
		expect(padBy(10)).toBe('10');
		expect(padBy(100, 2)).toBe('100');
		expect(padBy('hello', 3)).toBe('hello');
	});

	it('should handle zero values', () => {
		expect(padBy(0)).toBe('00');
		expect(padBy(0, 3)).toBe('000');
		expect(padBy('0')).toBe('00');
	});

	it('should not really handle negative numbers', () => {
		expect(padBy(-1)).toBe('-1');
		expect(padBy(-5, 4)).toBe('00-5'); // padStart pads the string representation
		expect(padBy(-10, 3)).toBe('-10');
	});

	it('should handle edge cases', () => {
		expect(padBy('', 3)).toBe('000');
		expect(padBy('abc', 5)).toBe('00abc');
		expect(padBy('123', 2)).toBe('123');
	});

	it('should handle length of 1', () => {
		expect(padBy(5, 1)).toBe('5');
		expect(padBy(10, 1)).toBe('10');
	});
});
