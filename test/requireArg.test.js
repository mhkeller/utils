import { describe, it, expect, vi, afterEach } from 'vitest';
import requireArg from '../lib/requireArg.js';

// Mock checkIsTrue since requireArg depends on it
vi.mock('../lib/checkIsTrue.js', () => ({
	default: vi.fn()
}));

describe('requireArg', () => {
	const originalArgv = process.argv;

	afterEach(() => {
		process.argv = originalArgv;
		vi.clearAllMocks();
	});

	it('should return argument when it exists and is not empty', async () => {
		process.argv = ['node', 'script.js', 'test-argument'];

		const result = requireArg();
		expect(result).toBe('test-argument');
	});

	it('should return trimmed argument', async () => {
		process.argv = ['node', 'script.js', '  test-argument  '];

		const result = requireArg();
		expect(result).toBe('test-argument');
	});

	it('should use custom index', async () => {
		process.argv = ['node', 'script.js', 'first', 'second', 'third'];

		const result = requireArg('Custom message', 3);
		expect(result).toBe('second');
	});

	it('should call checkIsTrue when argument is missing', async () => {
		const mockCheckIsTrue = await import('../lib/checkIsTrue.js');
		process.argv = ['node', 'script.js']; // No third argument

		requireArg('Test message');

		expect(mockCheckIsTrue.default).toHaveBeenCalledWith({
			condition: false,
			msg: 'Test message',
			value: 'undefined'
		});
	});

	it('should call checkIsTrue when argument is empty string', async () => {
		const mockCheckIsTrue = await import('../lib/checkIsTrue.js');
		process.argv = ['node', 'script.js', ''];

		requireArg('Empty argument');

		expect(mockCheckIsTrue.default).toHaveBeenCalledWith({
			condition: false,
			msg: 'Empty argument',
			value: 'undefined'
		});
	});

	it('should call checkIsTrue when argument is only whitespace', async () => {
		const mockCheckIsTrue = await import('../lib/checkIsTrue.js');
		process.argv = ['node', 'script.js', '   '];

		requireArg('Whitespace argument');

		expect(mockCheckIsTrue.default).toHaveBeenCalledWith({
			condition: false,
			msg: 'Whitespace argument',
			value: 'undefined'
		});
	});

	it('should use default message when none provided', async () => {
		const mockCheckIsTrue = await import('../lib/checkIsTrue.js');
		process.argv = ['node', 'script.js'];

		requireArg();

		expect(mockCheckIsTrue.default).toHaveBeenCalledWith({
			condition: false,
			msg: 'Argument required...',
			value: 'undefined'
		});
	});

	it('should handle different argument positions', async () => {
		process.argv = ['node', 'script.js', 'arg1', 'arg2', 'arg3'];

		expect(requireArg('msg', 2)).toBe('arg1');
		expect(requireArg('msg', 3)).toBe('arg2');
		expect(requireArg('msg', 4)).toBe('arg3');
	});
});
