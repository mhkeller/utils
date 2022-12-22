export default function getNow() {
	const d = new Date();
	return d.toISOString().replaceAll(':', '-');
}
