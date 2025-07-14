// @ts-ignore
import { readDataSync } from 'indian-ocean';

/**
 * Reads a dataset from a file
 * @param {string} filepath - Path to the dataset file
 * @returns {{filepath: string, data: Array<any>}} Object containing the filepath and the parsed data
 */
export default function readDataset(filepath) {
	const data = readDataSync(filepath);
	return { filepath, data };
}
