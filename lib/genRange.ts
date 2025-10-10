/**
 * Generate a range of numbers with a specified step, inclusive of the stop value.
 */
export default function genRange(start: number, stop: number, step = 1): number[] {
	// Input validation
	if (typeof start !== 'number' || typeof stop !== 'number') {
		throw new Error('Start and stop must be numbers');
	}
	if (step === 0) {
		throw new Error('Step cannot be zero');
	}

	// Helper function to get precision from step
	function format(step: number): (d: number) => number {
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
 */
function range(start: number, stop: number, step = 1): number[] {
	(start = +start),
		(stop = +stop),
		(step = (n = arguments.length) < 2 ? ((stop = start), (start = 0), 1) : n < 3 ? 1 : +step);

	var i = -1,
		// @ts-ignore
		n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
		range = new Array(n);

	while (++i < n) {
		range[i] = start + i * step;
	}

	return range;
}
