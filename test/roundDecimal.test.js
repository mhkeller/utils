import { describe, it, expect } from 'vitest';
import roundDecimal from '../lib/roundDecimal.js';

describe('roundDecimal', () => {
	it('should round to 1 decimal place by default', () => {
		expect(roundDecimal(3.14159)).toBe(3.1);
		expect(roundDecimal(2.78)).toBe(2.8);
		expect(roundDecimal(1.05)).toBe(1.1);
		expect(roundDecimal(1.04)).toBe(1.0);
	});

	it('should round to specified decimal places', () => {
		expect(roundDecimal(3.14159, 0)).toBe(3);
		expect(roundDecimal(3.14159, 2)).toBe(3.14);
		expect(roundDecimal(3.14159, 3)).toBe(3.142);
		expect(roundDecimal(3.14159, 4)).toBe(3.1416);
	});

	it('should handle negative numbers', () => {
		expect(roundDecimal(-3.14159, 2)).toBe(-3.14);
		expect(roundDecimal(-2.78, 1)).toBe(-2.8);
	});

	it('should handle whole numbers', () => {
		expect(roundDecimal(5, 2)).toBe(5);
		expect(roundDecimal(10, 1)).toBe(10);
	});

	it('should handle edge cases', () => {
		expect(roundDecimal(0, 2)).toBe(0);
		expect(roundDecimal(0.999, 2)).toBe(1.0);
		expect(roundDecimal(0.001, 2)).toBe(0.0);
	});

	it('should handle large decimal places', () => {
		expect(roundDecimal(1.123456789, 5)).toBe(1.12346);
		expect(roundDecimal(1.123456789, 8)).toBe(1.12345679);
	});
});
