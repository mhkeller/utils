/**
 * Format params to be used in a URL
 * @param {Object} params
 * @returns {String} The formatted params
 * @example
 *   const params = { foo: 'bar', baz: 'qux' };
 *   formatParams(params); // 'foo=bar&baz=qux'
 * @returns {String} The query parametrized string
 */
export default function formatParams(params) {
	return Object.entries(params).map(([key, value]) => {
		return `${key}=${value}`;
	}).join('&');
}
