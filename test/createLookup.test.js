import { describe, it, expect } from 'vitest';
import createLookup from '../lib/createLookup.js';

describe('createLookup', () => {
	it('should create a Map lookup from array of objects', () => {
		const data = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Charlie' }
		];

		const lookup = createLookup(data, 'id');

		expect(lookup).toBeInstanceOf(Map);
		expect(lookup.size).toBe(3);
		expect(lookup.get(1)).toEqual({ id: 1, name: 'Alice' });
		expect(lookup.get(2)).toEqual({ id: 2, name: 'Bob' });
		expect(lookup.get(3)).toEqual({ id: 3, name: 'Charlie' });
	});

	it('should handle string keys', () => {
		const data = [
			{ code: 'US', country: 'United States' },
			{ code: 'CA', country: 'Canada' },
			{ code: 'UK', country: 'United Kingdom' }
		];

		const lookup = createLookup(data, 'code');

		expect(lookup.get('US')).toEqual({ code: 'US', country: 'United States' });
		expect(lookup.get('CA')).toEqual({ code: 'CA', country: 'Canada' });
		expect(lookup.get('UK')).toEqual({ code: 'UK', country: 'United Kingdom' });
	});

	it('should handle empty arrays', () => {
		const lookup = createLookup([], 'id');
		expect(lookup).toBeInstanceOf(Map);
		expect(lookup.size).toBe(0);
	});

	it('should handle duplicate keys (last one wins)', () => {
		const data = [
			{ id: 1, name: 'Alice' },
			{ id: 1, name: 'Alice Updated' },
			{ id: 2, name: 'Bob' }
		];

		const lookup = createLookup(data, 'id');

		expect(lookup.size).toBe(2);
		expect(lookup.get(1)).toEqual({ id: 1, name: 'Alice Updated' });
		expect(lookup.get(2)).toEqual({ id: 2, name: 'Bob' });
	});

	it('should handle objects with missing keys', () => {
		const data = [
			{ id: 1, name: 'Alice' },
			{ name: 'Bob' }, // missing id
			{ id: 3, name: 'Charlie' }
		];

		const lookup = createLookup(data, 'id');

		expect(lookup.size).toBe(3);
		expect(lookup.get(1)).toEqual({ id: 1, name: 'Alice' });
		expect(lookup.get(undefined)).toEqual({ name: 'Bob' });
		expect(lookup.get(3)).toEqual({ id: 3, name: 'Charlie' });
	});

	it('should handle complex nested objects', () => {
		const data = [
			{ id: 1, user: { name: 'Alice', age: 30 } },
			{ id: 2, user: { name: 'Bob', age: 25 } }
		];

		const lookup = createLookup(data, 'id');

		expect(lookup.get(1)).toEqual({ id: 1, user: { name: 'Alice', age: 30 } });
		expect(lookup.get(2)).toEqual({ id: 2, user: { name: 'Bob', age: 25 } });
	});
});
