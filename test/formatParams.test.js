import { describe, it, expect } from 'vitest';
import formatParams from '../lib/formatParams.js';

describe('formatParams', () => {
	it('should format simple key-value pairs', () => {
		const params = { foo: 'bar', baz: 'qux' };
		const result = formatParams(params);

		expect(result).toBe('foo=bar&baz=qux');
	});

	it('should handle empty objects', () => {
		const result = formatParams({});
		expect(result).toBe('');
	});

	it('should encode special characters', () => {
		const params = {
			'special chars': 'hello world',
			symbols: '!@#$%^&*()',
			unicode: 'café'
		};
		const result = formatParams(params);

		expect(result).toContain('special%20chars=hello%20world');
		expect(result).toContain('symbols=!%40%23%24%25%5E%26*()'); // ! is not encoded by encodeURIComponent
		expect(result).toContain('unicode=caf%C3%A9');
	});

	it('should handle numeric values', () => {
		const params = {
			number: 123,
			float: 45.67,
			zero: 0,
			negative: -89
		};
		const result = formatParams(params);

		expect(result).toContain('number=123');
		expect(result).toContain('float=45.67');
		expect(result).toContain('zero=0');
		expect(result).toContain('negative=-89');
	});

	it('should handle boolean values', () => {
		const params = {
			isTrue: true,
			isFalse: false
		};
		const result = formatParams(params);

		expect(result).toContain('isTrue=true');
		expect(result).toContain('isFalse=false');
	});

	it('should handle null and undefined values', () => {
		const params = {
			nullValue: null,
			undefinedValue: undefined
		};
		const result = formatParams(params);

		expect(result).toContain('nullValue=null');
		expect(result).toContain('undefinedValue=undefined');
	});

	it('should handle array and object values by converting to string', () => {
		const params = {
			array: [1, 2, 3],
			object: { nested: 'value' }
		};
		const result = formatParams(params);

		expect(result).toContain('array=1%2C2%2C3'); // [1,2,3] becomes "1,2,3" then encoded
		expect(result).toContain('object=%5Bobject%20Object%5D'); // [object Object]
	});

	it('should handle keys with special characters', () => {
		const params = {
			'key with spaces': 'value',
			'key&with&symbols': 'another value',
			'key=with=equals': 'third value'
		};
		const result = formatParams(params);

		expect(result).toContain('key%20with%20spaces=value');
		expect(result).toContain('key%26with%26symbols=another%20value');
		expect(result).toContain('key%3Dwith%3Dequals=third%20value');
	});

	it('should maintain consistent order based on Object.entries', () => {
		const params = { c: '3', a: '1', b: '2' };
		const result = formatParams(params);

		// Object.entries maintains insertion order in modern JS
		expect(result).toBe('c=3&a=1&b=2');
	});

	it('should handle single parameter', () => {
		const params = { singleKey: 'singleValue' };
		const result = formatParams(params);

		expect(result).toBe('singleKey=singleValue');
	});

	it('should handle empty string values', () => {
		const params = {
			emptyString: '',
			normalString: 'value'
		};
		const result = formatParams(params);

		expect(result).toBe('emptyString=&normalString=value');
	});
});
