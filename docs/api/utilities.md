# General Utilities

Miscellaneous utility functions.

## checkIsTrue

**File:** `lib/checkIsTrue.js`

Checks if a condition is true. If not, it logs the value and exits the process.

**Parameters:**
- `options` (object) - Options object
- `options.condition` (boolean) - The condition to check
- `options.msg` (string) - The message to display if the condition is false
- `options.value` (any) - The value to display if the condition is false
- `options.context` (any, optional) - The context to display if the condition is false

**Example:**
```js
import { checkIsTrue } from '@mhkeller/utils'

// Usage example for checkIsTrue
```

## getTodo

**File:** `lib/getTodo.js`

Filter an array of items to only those that don't exist in the filesystem

**Parameters:**
- `files` (Array(any)) - Array of items to check
- `exists` (function(any): string, optional) - Function that returns a filepath to check for existence

**Returns:**
- Array(any) - Array of files that don't exist

**Example:**
```js
import { getTodo } from '@mhkeller/utils'

// Usage example for getTodo
```

## paginatedFetcher

**File:** `lib/paginatedFetcher.js`

A function that fetches all pages from a paginated API. It uses recursion to handle pagination and accumulates results.

**Parameters:**
- `options` (Object) - Options for the fetcher function.
- `options.isOk` (Function) - A function to check if the response is valid.
- `options.getItems` (Function) - A function to get the array items from the response.
- `options.getNext` (Function) - A function to get the next page URL from the response.
- `options.getTotal` (Function) - A function to get the total number of items from the response.
- `options.pageSize` (number) - The number of items per page.
- `options.sleepTime=1000` (number, optional) - The time to wait between requests in milliseconds.

**Returns:**
- Function - A function that fetches all pages from the API.
 * @throws {Error} Throws an error if the fetch fails or if the response structure is unexpected.

**Example:**
```js
import { paginatedFetcher } from '@mhkeller/utils'

// Usage example for paginatedFetcher
```

## queueCalls

**File:** `lib/queueCalls.js`

Queue calls to a function with a concurrency limit.

**Parameters:**
- `items` (Array(any)) - The parameters to pass to the function.
- `fn` (Function) - The function to call with each item.
- `concurrency=Infinity` (number, optional) - The maximum number of concurrent calls.

**Returns:**
- Promise(Array of any) - A promise that resolves to an array of results when all calls have completed.
 * @example
 * const items = [1, 2, 3, 4, 5];
 * const fn = async (item, index, total) => {
 *  console.log(`Calling ${item} (${index} of ${total})`);
 *  await new Promise(resolve => setTimeout(resolve, 1000));
 *  console.log(`Called ${item} (${index} of ${total})`);
 *  return item * 2;
 * };
 * const results = await queueCalls(items, fn, 2);
 * console.log(results);

**Example:**
```js
import { queueCalls } from '@mhkeller/utils'

// Usage example for queueCalls
```

## requireArg

**File:** `lib/requireArg.js`

Require a command line argument and exit if it is not provided

**Parameters:**
- `msg` (string) - Error message to display if argument is missing
- `index` (number) - Index of the argument to require in process.argv

**Returns:**
- string - The required argument value, trimmed

**Example:**
```js
import { requireArg } from '@mhkeller/utils'

// Usage example for requireArg
```

