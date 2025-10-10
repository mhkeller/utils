import { readFile, writeFile } from 'fs/promises';
import { PDFDocument } from '@cantoo/pdf-lib'; // Use this fork for decryption support. See https://github.com/Hopding/pdf-lib/issues/233
import { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import notify from '@mhkeller/notify';

/**
 * Adapted from the Python parser here: https://docs.aws.amazon.com/textract/latest/dg/examples-export-table-csv.html
 * This includes some slightly better null handling and the removal of empty first rows
 * @param {string} filepath - The path to the PDF file.
 * @param {number} pageIndex - The 0-based page index to extract the table from.
 * @param {object} [options] - Options for the extraction.
 * @param {string} [options.region='us-east-1'] - The AWS region to use for Textract.
 * @param {number} [options.tableIndex=0] - The 0-based index of the table to extract.
 * @returns {Promise<Array<object>|null>} - A promise that resolves to an array of objects representing the table rows.
 * @throws {Error} - Throws an error if the PDF file does not exist or if the extraction fails.
 */
export default async function textractTable(
	filepath,
	pageIndex,
	{ region = 'us-east-1', tableIndex = 0 } = {}
) {
	const singlePageasBytes = await getPageAsBytes(filepath, pageIndex);
	const client = new TextractClient({ region });

	/**
	 * Send our data off to Textract for analysis
	 */
	const command = new AnalyzeDocumentCommand({
		Document: {
			Bytes: singlePageasBytes
		},
		FeatureTypes: ['TABLES']
	});
	const response = await client.send(command);
	if (!response || !response.Blocks || response.Blocks.length === 0) {
		notify({
			m: '\t\t\tNo blocks found in the response.',
			d: 'red'
		});
		console.error(response);
	}

	/**
	 * Extract the table block to analyze from the response
	 * In the future, this script could analyze all tables, but for now it
	 * just does one as a safety check
	 */
	/** @type {Array<import('@aws-sdk/client-textract').Block>} */
	const tableBlocks = [];
	/** @type {Record<string, import('@aws-sdk/client-textract').Block>} */
	const blocksMap = {};
	for (const block of response.Blocks || []) {
		if (block.BlockType === 'TABLE') {
			tableBlocks.push(block);
		}
		if (block.Id) {
			blocksMap[block.Id] = block;
		}
	}

	if (tableBlocks.length === 0) {
		notify({
			m: '\t\tNo table blocks found in the response.',
			d: 'red'
		});
		return null;
	} else if (tableBlocks.length > 1) {
		notify({
			m: '\t\tMultiple table blocks found. Please specify an index.',
			d: 'red'
		});
		return null;
	}
	const tableBlock = tableBlocks[tableIndex];

	if (!tableBlock) {
		notify({
			m: `\t\tNo table block at index ${tableIndex} found in the response.`,
			d: 'red'
		});
		console.error(response);
		return null;
	}

	return extractTableData(tableBlock, blocksMap);
}

/**
 * @param {import('@aws-sdk/client-textract').Block} tableBlock - The table block from Textract response.
 * @param {Record<string, import('@aws-sdk/client-textract').Block>} blocksMap - A map of block IDs to blocks.
 */
function extractTableData(tableBlock, blocksMap) {
	const rowsColumnsMap = getRowsColumnsMap(tableBlock, blocksMap);
	if (Object.keys(rowsColumnsMap).length === 0) {
		throw new Error('No rows found in the table block.');
	}

	// Get sorted row indices (Textract RowIndex is 1-based)
	const sortedRowIndices = Object.keys(rowsColumnsMap)
		.map(Number)
		.sort((a, b) => a - b);

	// Assume the first row (smallest RowIndex) is the header
	let headerCellsMap = rowsColumnsMap[sortedRowIndices[0]];

	// Remove the first row if it is empty, this logic is not in the original Python code
	if (headerCellsMap && sortedRowIndices.length > 1) {
		const nonEmptyHeaderCells = Object.values(headerCellsMap).filter(value => value.trim());
		if (nonEmptyHeaderCells.length === 0) {
			// Consider the next row as header
			headerCellsMap = rowsColumnsMap[sortedRowIndices[1]];
			sortedRowIndices.shift(); // Remove the empty first row from data processing
			notify({
				m: '\t\tWarning: Removed an empty first row and using the second row as the header.',
				v: Object.values(headerCellsMap).join(', '),
				d: 'yellow'
			});
		}
	}

	if (!headerCellsMap) {
		throw new Error('No header cells found in the table block.');
	}

	// Get sorted column indices for the header (Textract ColumnIndex is 1-based)
	const sortedHeaderColIndices = Object.keys(headerCellsMap)
		.map(Number)
		.sort((a, b) => a - b);

	const headers = sortedHeaderColIndices.map(colIndex => headerCellsMap[colIndex]);

	const data = [];
	// Iterate over data rows (all rows except the header row)
	for (let i = 1; i < sortedRowIndices.length; i++) {
		const dataRowIndex = sortedRowIndices[i];
		const dataCellsMap = rowsColumnsMap[dataRowIndex];
		/** @type {Record<string, string>} */
		const rowObject = {};

		for (let j = 0; j < headers.length; j++) {
			const headerText = headers[j];
			const originalColumnIndex = sortedHeaderColIndices[j]; // Get the column index corresponding to this header
			rowObject[headerText] = dataCellsMap[originalColumnIndex] || ''; // Assign value, use empty string if cell missing
		}
		data.push(rowObject);
	}

	return data;
}

/**
 * @param {import('@aws-sdk/client-textract').Block} tableBlock - The table block from Textract response.
 * @param {Record<string, import('@aws-sdk/client-textract').Block>} blocksMap - A map of block IDs to blocks.
 */
function getRowsColumnsMap(tableBlock, blocksMap) {
	/** @type {Record<number, Record<number, string>>} */
	const rows = {};
	for (const rel of tableBlock.Relationships || []) {
		if (rel.Type === 'CHILD' && rel.Ids) {
			for (const childId of rel.Ids) {
				const cell = blocksMap[childId];
				const rowIndex = cell.RowIndex;
				const columnIndex = cell.ColumnIndex;

				if (
					cell.BlockType === 'CELL' &&
					typeof rowIndex !== 'undefined' &&
					typeof columnIndex !== 'undefined'
				) {
					if (!rows[rowIndex]) {
						rows[rowIndex] = {};
					}
					rows[rowIndex][columnIndex] = getText(cell, blocksMap);
				}
			}
		}
	}
	return rows;
}

/**
 * @param {import('@aws-sdk/client-textract').Block} cell - The cell block from Textract response.
 * @param {Record<string, import('@aws-sdk/client-textract').Block>} blocksMap - A map of block IDs to blocks.
 */
function getText(cell, blocksMap) {
	let text = '';
	for (const rel of cell.Relationships || []) {
		if (rel.Type === 'CHILD' && rel.Ids) {
			for (const childId of rel.Ids) {
				const word = blocksMap[childId];

				if (word.BlockType === 'WORD' && word.Text) {
					text += `${word.Text} `;
				} else if (word.BlockType === 'SELECTION_ELEMENT' && word.SelectionStatus === 'SELECTED') {
					text += 'X ';
				}
			}
		}
	}
	return text.trim();
}

/**
 * @param {string} filepath - The path to the PDF file.
 * @param {number} pageIndex - The 0-based page index to extract the table from.
 * @returns {Promise<Uint8Array>} - A promise that resolves to a byte array of the single page PDF.
 * @throws {Error} - Throws an error if the PDF file does not exist or if the extraction fails.
 */
async function getPageAsBytes(filepath, pageIndex) {
	try {
		const pdfDoc = await PDFDocument.load(await readFile(filepath), {
			password: ''
		});

		if (pageIndex < 0 || pageIndex >= pdfDoc.getPageCount()) {
			throw new Error(`Invalid page index: ${pageIndex}. Total pages: ${pdfDoc.getPageCount()}`);
		}

		// Create a new, empty PDF document.
		const newPdfDoc = await PDFDocument.create();

		// Copy the desired page (pdf-lib uses 0-indexed page numbers).
		const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
		newPdfDoc.addPage(copiedPage);

		// Save the new document (containing only the single page) into a byte array.
		const singlePagePdfBytes = await newPdfDoc.save();

		await writeFile('./tmp/test.pdf', singlePagePdfBytes);

		return singlePagePdfBytes;
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error extracting PDF page: ${error.message}`);
		} else {
			console.error('An unknown error occurred while extracting PDF page.');
		}
		throw error;
	}
}
