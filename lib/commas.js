import { formatLocale } from 'd3-format';

// Replace the unicode minus with a regular minus so that our + to numbers conversion works correctly
const customLocale = formatLocale({
	thousands: ',',
	grouping: [3],
	decimal: '.',
	minus: '-',
	currency: ['$', '']
});

/**
 * Add commas to a number
 * @param {number} number The number to format
 * @returns {string} The formatted number with commas
 */
export default customLocale.format(',');
