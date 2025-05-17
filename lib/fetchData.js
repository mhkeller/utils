/**
 * Fetches data from a given URL using the native fetch API.
 * @param {string} url The URL to fetch data from.
 * @returns {Promise<object>} A promise that resolves with the parsed JSON data.
 */
export default async function fetchData(url) {
	try {
		// Use the native fetch API
		const response = await fetch(url);

		// Check if the request was successful
		if (!response.ok) {
			const errorText = await response.text(); // Get error message from response body
			console.error(
				`HTTP error for URL ${url}: ${response.status} ${response.statusText}. Body: ${errorText}`
			);
			throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
		}

		// Parse the JSON response directly
		const parsedData = await response.json();
		return parsedData;
	} catch (e) {
		console.error(`Error fetching or parsing JSON for URL ${url}:`, e.message);
		// Rethrow the error to be caught by the caller
		throw e;
	}
}
