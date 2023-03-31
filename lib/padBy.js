/**
	Pad a string with zeros
	@param {Number} number The number to pad
	@param {Number} padBy How many zeros to pad by
*/
export default function padBy(num, pb = 2) {
	return String(num).padStart(pb, '0');
};
