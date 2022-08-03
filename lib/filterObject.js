export default function filterObject(obj, keys) {
	return Object.fromEntries(keys.map(k => {
		return [k, obj[k]];
	}));
}
