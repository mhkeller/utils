/**
	Pad a string with zeros
	@param {Number} value The number to pad
	@param {Number} padBy How many zeros to pad by
	@returns {String} The padded string
*/
export default function padBy(value, pb = 2) {
	return String(value).padStart(pb, '0');
};
