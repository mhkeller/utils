import notify from '@mhkeller/notify';

import commas from './commas.js';
import sleep from './sleep.js';

import fetchData from './fetchData.js';

/**
 * A function that fetches all pages from a paginated API.
 * It uses recursion to handle pagination and accumulates results.
 * @param {Object} options - Options for the fetcher function.
 * @param {Function} options.isOk - A function to check if the response is valid.
 * @param {Function} options.getItems - A function to get the array items from the response.
 * @param {Function} options.getNext - A function to get the next page URL from the response.
 * @param {Function} options.getTotal - A function to get the total number of items from the response.
 * @param {number} options.pageSize - The number of items per page.
 * @param {number} [options.sleepTime=1000] - The time to wait between requests in milliseconds.
 * @returns {Function} A function that fetches all pages from the API.
 * @throws {Error} Throws an error if the fetch fails or if the response structure is unexpected.
 */
export default function paginatedFetcher({
	isOk,
	getItems,
	getNext,
	getTotal,
	pageSize,
	sleepTime = 1000
}) {
	let counter = 1;
	let total = null;
	/**
	 * Fetches all pages from the paginated API.
	 * @param {string} currentUrl The URL of the current page to fetch.
	 * @param {Array} accumulatedResults An array to store results from all pages.
	 * @returns {Promise<Array>} A promise that resolves with all accumulated results.
	 */
	return async function fetcher(currentUrl, accumulatedResults = []) {
		// @ts-ignore
		notify({
			m: `\t\tFetching page...`,
			v: `${commas(counter)} / ${total ? commas(Math.ceil(total / pageSize)) : 'unknown'}`,
			d: 'task'
		});
		try {
			const response = await fetchData(currentUrl);

			// Ensure response and response.data exist
			// The NHTSA API nests results under a 'data' key in the successful response.
			// Sometimes the API might return an empty array or an object without 'data' if no results.
			if (!isOk(response)) {
				notify({
					m: `\t\t\tUnexpected response structure for URL '${currentUrl}':`,
					v: response,
					d: 'error'
				});
			} else {
				const items = getItems(response);
				total = total || getTotal(response);

				// Add the results from the current page
				accumulatedResults = accumulatedResults.concat(items);
				notify({ m: `\t\t\tGot...`, v: commas(items.length), d: 'green' });
			}

			// Check for the next page URL
			const nextPageUrl = getNext(response);

			if (nextPageUrl) {
				// If there's a next page, recursively call the fetcher
				// Adding a small delay to be respectful to the API server
				await sleep(sleepTime, { indent: 3 });
				counter += 1;
				return fetcher(nextPageUrl, accumulatedResults);
			} else {
				// If there's no next page, we're done
				return accumulatedResults;
			}
		} catch (error) {
			// Log the specific URL that caused the error
			notify({
				m: `\t\t\tAn error occurred during fetching page ${currentUrl}:`,
				v: error.message,
				d: 'error'
			});

			console.error(error);
			// In case of an error, return what has been accumulated so far
			// This allows partial results if one page fails.
			return accumulatedResults;
		}
	};
}
