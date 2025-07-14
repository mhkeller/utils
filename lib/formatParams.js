/**
 * Format params to be used in a URL
 * @param {Object} params - The parameters to format
 * @example
 *   const params = { foo: 'bar', baz: 'qux' };
 *   formatParams(params); // 'foo=bar&baz=qux'
 * @returns {string} The query parametrized string
 */
export default function formatParams(params) {
	return Object.entries(params)
		.map(([key, value]) => {
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		})
		.join('&');
}
