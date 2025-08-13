import { describe, it, expect } from 'vitest';
import toTitleCase from '../lib/toTitleCase.js';

describe('toTitleCase', () => {
	it('should convert lowercase strings to title case', () => {
		expect(toTitleCase('hello world')).toBe('Hello World');
		expect(toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox');
	});

	it('should convert uppercase strings to title case', () => {
		expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
		expect(toTitleCase('THE QUICK BROWN FOX')).toBe('The Quick Brown Fox');
	});

	it('should handle mixed case strings', () => {
		expect(toTitleCase('hElLo WoRlD')).toBe('Hello World');
		expect(toTitleCase('tHe QuIcK bRoWn FoX')).toBe('The Quick Brown Fox');
	});

	it('should handle single words', () => {
		expect(toTitleCase('hello')).toBe('Hello');
		expect(toTitleCase('WORLD')).toBe('World');
		expect(toTitleCase('tEsT')).toBe('Test');
	});

	it('does not handle strings with special characters', () => {
		expect(toTitleCase('hello-world')).toBe('Hello-world');
		expect(toTitleCase('hello_world')).toBe('Hello_world');
		expect(toTitleCase('hello.world')).toBe('Hello.world');
	});

	it('should handle empty and edge cases', () => {
		expect(toTitleCase('')).toBe('');
		expect(toTitleCase('a')).toBe('A');
		expect(toTitleCase('A')).toBe('A');
	});

	it('should handle numbers and mixed content', () => {
		expect(toTitleCase('hello123world')).toBe('Hello123world');
		expect(toTitleCase('test 123 case')).toBe('Test 123 Case');
	});

	it('should handle strings with multiple spaces', () => {
		expect(toTitleCase('hello  world')).toBe('Hello  World');
		expect(toTitleCase('  hello world  ')).toBe('  Hello World  ');
	});
});
