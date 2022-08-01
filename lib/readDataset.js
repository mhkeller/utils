import { readDataSync } from 'indian-ocean';

export default function readDataset(filepath) {
	const data = readDataSync(filepath);
	return { filepath, data };
}
