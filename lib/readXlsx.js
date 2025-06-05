import { readFileSync } from 'fs';
import { read, utils } from 'xlsx/xlsx.mjs';

/**
 * Read an XLSX file and return the data as a JSON object.
 * If no `sheetName` is supplied, return the first sheet.
 * @param {string} filepath - The path to the XLSX file.
 * @param {string} [sheetName] - The name of the sheet to read.
 * @returns {Array<Object>} The data from the XLSX file as an array of objects.
 */
export default function readXlsx(filepath, sheetName) {
	const workbook = read(readFileSync(filepath));
	if (typeof sheetName === 'string') {
		return utils.sheet_to_json(workbook.Sheets[sheetName]);
	}
	return utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
}
