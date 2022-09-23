export default function createLookup(list, key) {
	return new Map(list.map(d => {
		return [d[key], d];
	}));
}
