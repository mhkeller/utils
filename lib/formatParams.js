export default function formatParams(params) {
	return Object.entries(params).map(([key, value]) => {
		return `${key}=${value}`;
	}).join('&');
}
