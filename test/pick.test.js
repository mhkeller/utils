import { describe, it, expect } from 'vitest';
import pick from '../lib/pick.js';

describe('pick', () => {
	it('should pick specified keys from object', () => {
		const obj = { a: 1, b: 2, c: 3, d: 4 };
		const result = pick(obj, ['a', 'c']);

		expect(result).toEqual({ a: 1, c: 3 });
	});

	it('should handle empty key array', () => {
		const obj = { a: 1, b: 2, c: 3 };
		const result = pick(obj, []);

		expect(result).toEqual({});
	});

	it('should handle keys that do not exist in object', () => {
		const obj = { a: 1, b: 2 };
		const result = pick(obj, ['a', 'x', 'y']);

		expect(result).toEqual({ a: 1, x: undefined, y: undefined });
	});

	it('should handle empty object', () => {
		const obj = {};
		const result = pick(obj, ['a', 'b']);

		expect(result).toEqual({ a: undefined, b: undefined });
	});

	it('should handle nested object values', () => {
		const obj = {
			user: { name: 'Alice', age: 30 },
			settings: { theme: 'dark' },
			other: 'value'
		};
		const result = pick(obj, ['user', 'settings']);

		expect(result).toEqual({
			user: { name: 'Alice', age: 30 },
			settings: { theme: 'dark' }
		});
	});

	it('should handle various data types', () => {
		const obj = {
			string: 'hello',
			number: 42,
			boolean: true,
			array: [1, 2, 3],
			null: null,
			undefined: undefined
		};
		const result = pick(obj, ['string', 'number', 'boolean', 'array', 'null', 'undefined']);

		expect(result).toEqual({
			string: 'hello',
			number: 42,
			boolean: true,
			array: [1, 2, 3],
			null: null,
			undefined: undefined
		});
	});

	it('should not modify the original object', () => {
		const obj = { a: 1, b: 2, c: 3 };
		const originalObj = { ...obj };
		const result = pick(obj, ['a', 'b']);

		expect(obj).toEqual(originalObj);
		expect(result).not.toBe(obj);
	});

	it('should handle single key', () => {
		const obj = { a: 1, b: 2, c: 3 };
		const result = pick(obj, ['b']);

		expect(result).toEqual({ b: 2 });
	});
});
