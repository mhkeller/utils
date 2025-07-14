import { describe, it, expect } from 'vitest';
import commas from '../lib/commas.js';

describe('commas', () => {
	it('should add commas to numbers', () => {
		expect(commas(1000)).toBe('1,000');
		expect(commas(1234567)).toBe('1,234,567');
		expect(commas(123)).toBe('123');
		expect(commas(0)).toBe('0');
	});

	it('should handle negative numbers', () => {
		expect(commas(-1000)).toBe('-1,000'); // d3-format uses Unicode minus sign
		expect(commas(-1234567)).toBe('-1,234,567');
	});

	it('should handle decimal numbers', () => {
		expect(commas(1000.5)).toBe('1,000.5');
		expect(commas(1234567.89)).toBe('1,234,567.89');
	});

	it('should handle edge cases', () => {
		expect(commas(1)).toBe('1');
		expect(commas(10)).toBe('10');
		expect(commas(100)).toBe('100');
		expect(commas(1000)).toBe('1,000');
		expect(commas(10000)).toBe('10,000');
		expect(commas(100000)).toBe('100,000');
		expect(commas(1000000)).toBe('1,000,000');
	});
});
