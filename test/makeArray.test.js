import { describe, it, expect } from 'vitest';
import makeArray from '../lib/makeArray.js';

describe('makeArray', () => {
	it('should create an array with the specified number of elements', () => {
		const arr = makeArray(5);
		expect(arr).toHaveLength(5);
		expect(arr).toEqual([undefined, undefined, undefined, undefined, undefined]);
	});

	it('should create an empty array when n is 0', () => {
		const arr = makeArray(0);
		expect(arr).toHaveLength(0);
		expect(arr).toEqual([]);
	});

	it('should create a single element array when n is 1', () => {
		const arr = makeArray(1);
		expect(arr).toHaveLength(1);
		expect(arr).toEqual([undefined]);
	});

	it('should handle large numbers', () => {
		const arr = makeArray(100);
		expect(arr).toHaveLength(100);
		expect(arr.every(item => item === undefined)).toBe(true);
	});

	it('should allow mapping over the result', () => {
		const arr = makeArray(3).map((_, i) => i);
		expect(arr).toEqual([0, 1, 2]);
	});
});
