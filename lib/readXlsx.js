import { readFileSync } from 'fs';
import { read, utils } from 'xlsx/xlsx.mjs';

/**
 * Read an XLSX file and return the data as a JSON object.
 * @param {string} filepath - The path to the XLSX file.
 * @param {string|number} sheetName - The name or index of the sheet to read.
 * @returns {object} The data from the XLSX file.
 */
export default function readXslx (filepath, sheetName = 0) {
	const workbook = read(readFileSync(filepath));
	const json = utils.sheet_to_json(workbook.Sheets[sheetName]);
	return json;
}
