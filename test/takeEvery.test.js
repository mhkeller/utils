import { describe, it, expect } from 'vitest';
import takeEvery from '../lib/takeEvery.js';

describe('takeEvery', () => {
	it('should take every nth element to get approximately n items', () => {
		const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const result = takeEvery(list, 3);

		// Should take every ~3rd element (10/3 ≈ 3.33, rounds to 3)
		expect(result).toEqual([1, 4, 7, 10]);
	});

	it('should return the full array if n >= array length', () => {
		const list = [1, 2, 3];
		expect(takeEvery(list, 3)).toEqual([1, 2, 3]);
		expect(takeEvery(list, 5)).toEqual([1, 2, 3]);
	});

	it('should return empty array for non-array input', () => {
		expect(takeEvery('not an array', 3)).toEqual([]);
		expect(takeEvery(null, 3)).toEqual([]);
		expect(takeEvery(undefined, 3)).toEqual([]);
	});

	it('should return empty array when n <= 0', () => {
		const list = [1, 2, 3, 4, 5];
		expect(takeEvery(list, 0)).toEqual([]);
		expect(takeEvery(list, -1)).toEqual([]);
	});

	it('should handle empty arrays', () => {
		expect(takeEvery([], 3)).toEqual([]);
	});

	it('should handle single element arrays', () => {
		expect(takeEvery([1], 1)).toEqual([1]);
		expect(takeEvery([1], 5)).toEqual([1]);
	});

	it('should work with larger arrays', () => {
		const list = Array.from({ length: 20 }, (_, i) => i + 1);
		const result = takeEvery(list, 5);

		// 20/5 = 4, so take every 4th element
		expect(result).toEqual([1, 5, 9, 13, 17]);
	});

	it('should handle exact divisions', () => {
		const list = [1, 2, 3, 4, 5, 6, 7, 8];
		const result = takeEvery(list, 4);

		// 8/4 = 2, so take every 2nd element
		expect(result).toEqual([1, 3, 5, 7]);
	});

	it('should work with different data types', () => {
		const list = ['a', 'b', 'c', 'd', 'e', 'f'];
		const result = takeEvery(list, 3);

		// 6/3 = 2, so take every 2nd element
		expect(result).toEqual(['a', 'c', 'e']);
	});

	it('should handle objects', () => {
		const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
		const result = takeEvery(list, 2);

		// 6/2 = 3, so take every 3rd element
		expect(result).toEqual([{ id: 1 }, { id: 4 }]);
	});

	it('should handle when n=1', () => {
		const list = [1, 2, 3, 4, 5];
		const result = takeEvery(list, 1);

		// 5/1 = 5, so take every 5th element
		expect(result).toEqual([1]);
	});
});
