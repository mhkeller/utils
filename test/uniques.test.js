import { describe, it, expect } from 'vitest';
import uniques from '../lib/uniques.js';

describe('uniques', () => {
	it('should return unique values from a simple array', () => {
		const list = [1, 2, 2, 3, 3, 3, 4];
		const result = uniques(list);

		expect(result).toEqual([1, 2, 3, 4]);
	});

	it('should return unique strings', () => {
		const list = ['apple', 'banana', 'apple', 'cherry', 'banana'];
		const result = uniques(list);

		expect(result).toEqual(['apple', 'banana', 'cherry']);
	});

	it('should handle empty arrays', () => {
		const result = uniques([]);
		expect(result).toEqual([]);
	});

	it('should handle arrays with one element', () => {
		const result = uniques([1]);
		expect(result).toEqual([1]);
	});

	it('should return null for non-array input', () => {
		expect(uniques('not an array')).toBe(null);
		expect(uniques(123)).toBe(null);
		expect(uniques({})).toBe(null);
		expect(uniques(null)).toBe(null);
		expect(uniques(undefined)).toBe(null);
	});

	it('should handle accessor function', () => {
		const list = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 1, name: 'Alice Duplicate' },
			{ id: 3, name: 'Charlie' }
		];

		const result = uniques(list, d => d.id);
		expect(result).toEqual([1, 2, 3]);
	});

	it('should handle accessor function with transform=false', () => {
		const list = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 1, name: 'Alice Duplicate' },
			{ id: 3, name: 'Charlie' }
		];

		const result = uniques(list, d => d.id, false);
		expect(result).toEqual([
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Charlie' }
		]);
	});

	it('should handle string accessor (property name)', () => {
		const list = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 1, name: 'Alice Duplicate' },
			{ id: 3, name: 'Charlie' }
		];

		const result = uniques(list, 'id');
		expect(result).toEqual([1, 2, 3]);
	});

	it('should handle string accessor with transform=false', () => {
		const list = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 1, name: 'Alice Duplicate' },
			{ id: 3, name: 'Charlie' }
		];

		const result = uniques(list, 'id', false);
		expect(result).toEqual([
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Charlie' }
		]);
	});

	it('should handle nested property access', () => {
		const list = [
			{ user: { id: 1 }, name: 'Alice' },
			{ user: { id: 2 }, name: 'Bob' },
			{ user: { id: 1 }, name: 'Alice Duplicate' }
		];

		const result = uniques(list, d => d.user.id);
		expect(result).toEqual([1, 2]);
	});

	it('should handle mixed data types', () => {
		const list = [1, '1', 1, 2, '2', 2];
		const result = uniques(list);

		expect(result).toEqual([1, '1', 2, '2']);
	});

	it('should preserve order of first occurrence', () => {
		const list = [3, 1, 2, 1, 3, 2, 4];
		const result = uniques(list);

		expect(result).toEqual([3, 1, 2, 4]);
	});
});
