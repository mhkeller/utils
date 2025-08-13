import { describe, it, expect } from 'vitest';
import makeIndent from '../lib/makeIndent.js';

describe('makeIndent', () => {
	it('should return correct number of tabs', () => {
		expect(makeIndent(0)).toBe('');
		expect(makeIndent(1)).toBe('\t');
		expect(makeIndent(2)).toBe('\t\t');
		expect(makeIndent(3)).toBe('\t\t\t');
		expect(makeIndent(5)).toBe('\t\t\t\t\t');
	});

	it('should handle large numbers', () => {
		const result = makeIndent(10);
		expect(result).toBe('\t'.repeat(10));
		expect(result.length).toBe(10);
	});

	it('should handle zero', () => {
		expect(makeIndent(0)).toBe('');
	});

	it('should handle negative numbers', () => {
		// repeat() with negative numbers should throw
		expect(() => makeIndent(-1)).toThrow('Invalid count value');
		expect(() => makeIndent(-5)).toThrow('Invalid count value');
	});

	it('should handle decimal numbers', () => {
		// repeat() truncates decimal numbers
		expect(makeIndent(2.7)).toBe('\t\t');
		expect(makeIndent(3.1)).toBe('\t\t\t');
	});

	it('should return only tab characters', () => {
		const result = makeIndent(3);
		expect(result.split('').every(char => char === '\t')).toBe(true);
	});
});
