/**
 * Generate a range of numbers with a specified step, inclusive of the stop value.
 * @param {number} start - The starting number
 * @param {number} stop - The ending number (inclusive)
 * @param {number} [step=1] - The step increment
 * @returns {number[]} An array of numbers from start to stop with the given step
 */
export default function genRange(start, stop, step = 1) {
	// Input validation
	if (typeof start !== 'number' || typeof stop !== 'number') {
		throw new Error('Start and stop must be numbers');
	}
	if (step === 0) {
		throw new Error('Step cannot be zero');
	}

	// Helper function to get precision from step
	/**
	 * @param {number} step
	 * @returns {(d: number) => number}
	 */
	function format(step) {
		// Handle integer steps
		if (Number.isInteger(step)) return d => d;

		// Get precision from decimal places
		const precision = String(step).split('.')[1].length;
		return d => +d.toFixed(precision);
	}

	const r = range(start, stop, step).map(format(step));
	r.push(stop);
	return r;
}

/**
 * Returns an array of numbers from start to stop (exclusive) by step.
 * If step is not provided, it defaults to 1.
 * D3-array range source: https://github.com/d3/d3-array/blob/main/src/range.js
 * @param {number} start - The starting number
 * @param {number} stop - The ending number (exclusive)
 * @param {number} [step=1] - The step increment
 * @returns {number[]} An array of numbers from start to stop with the given step
 */
function range(start, stop, step = 1) {
	/** @type {number} */
	let n;
	((start = +start),
		(stop = +stop),
		(step = (n = arguments.length) < 2 ? ((stop = start), (start = 0), 1) : n < 3 ? 1 : +step));

	var i = -1,
		result = new Array((n = Math.max(0, Math.ceil((stop - start) / step)) | 0));

	while (++i < n) {
		result[i] = start + i * step;
	}

	return result;
}
