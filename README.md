Utils
===

[![Tests](https://github.com/mhkeller/utils/workflows/Tests/badge.svg)](https://github.com/mhkeller/utils/actions/workflows/test.yml)
[![Code Quality](https://github.com/mhkeller/utils/workflows/Code%20Quality/badge.svg)](https://github.com/mhkeller/utils/actions/workflows/quality.yml)

> A collection of utility functions

## Installing

```sh
npm install @mhkeller/utils
```


<!-- AUTO-GENERATED DOCS -->

## Core Functions

### checkIsTrue

Checks if a condition is true. If not, it logs the value and exits the process.

**Parameters:**
- `options` *object* - Options object
- `options.condition` *boolean* - The condition to check
- `options.msg` *string* - The message to display if the condition is false
- `options.value` *any* - The value to display if the condition is false
- `options.context` *any* (optional) - The context to display if the condition is false

**Usage:**
```js
import { checkIsTrue } from '@mhkeller/utils';
```

### commas

Add commas to a number

**Parameters:**
- `number` *number* - The number to format

**Returns:** *string* - The formatted number with commas

**Usage:**
```js
import { commas } from '@mhkeller/utils';
```

### createLookup

Creates a Map lookup from an array of objects

**Parameters:**
- `list` *Array<Object>* - The array of objects to create a lookup from
- `key` *string* - The key in each object to use as the Map key

**Returns:** *Map<any, Object>* - A Map where the keys are the values of the specified property and the values are the original objects

**Usage:**
```js
import { createLookup } from '@mhkeller/utils';
```

### createSqlite

@typedef {Record<string, 'null' | 'integer' | 'real' | 'text' | 'blob'>} Schema

**Usage:**
```js
import { createSqlite } from '@mhkeller/utils';
```

### fetchData

Fetches data from a given URL using the native fetch API.

**Parameters:**
- `url` *string* - The URL to fetch data from.

**Returns:** *Promise<object>* - A promise that resolves with the parsed JSON data.

**Usage:**
```js
import { fetchData } from '@mhkeller/utils';
```

### formatParams

Format params to be used in a URL

**Parameters:**
- `params` *Object* - The parameters to format

**Returns:** *string* - The query parametrized string

**Usage:**
```js
import { formatParams } from '@mhkeller/utils';
```

### genDirs

Generate the input and output directory filepaths

**Parameters:**
- `importMeta` *ImportMeta* - The import.meta object
- `baseDir=''` *string* (optional) - The base directory

**Returns:** *{inDir: string, outDir: string* - } An object with the input and output directory filepaths

**Usage:**
```js
import { genDirs } from '@mhkeller/utils';
```

### getNow

Returns the current date and time as a string.

**Returns:** *string* - The current date and time as a string

**Usage:**
```js
import { getNow } from '@mhkeller/utils';
```

### getTodo

Filter an array of items to only those that don't exist in the filesystem

**Parameters:**
- `files` *Array<any>* - Array of items to check
- `exists` *function(any): string* (optional) - Function that returns a filepath to check for existence

**Returns:** *Array<any>* - Array of files that don't exist

**Usage:**
```js
import { getTodo } from '@mhkeller/utils';
```

### initLogProgress

Logs progress in loop to the console every n-times. Also logs the last iteration. It also displays how much time is left in the process by calculating the average time per iteration.

**Parameters:**
- `total` *number* - The total number of iterations in the loop.
- `options` *object* (optional) - Options object
- `options.every=1` *number* (optional) - How many times to log the progress.

**Returns:** *Function* - A function that logs the progress in the loop.

**Usage:**
```js
import { initLogProgress } from '@mhkeller/utils';
```

### makeArray

Make an array of n elements

**Parameters:**
- `n` *number* - The number of elements

**Returns:** *Array<undefined>* - An array of n undefined elements

**Usage:**
```js
import { makeArray } from '@mhkeller/utils';
```

### makeIndent

Returns the given number of tabs

**Parameters:**
- `indent` *number* - The number of tabs to create

**Returns:** *string* - A string with the specified number of tabs

**Usage:**
```js
import { makeIndent } from '@mhkeller/utils';
```

### padBy

Pad a string or number with leading zeros

**Parameters:**
- `value` *string|number* - The value to pad
- `pb` *number* - How many characters the resulting string should have

**Returns:** *string* - The padded string

**Usage:**
```js
import { padBy } from '@mhkeller/utils';
```

### paginatedFetcher

A function that fetches all pages from a paginated API. It uses recursion to handle pagination and accumulates results.

**Parameters:**
- `options` *Object* - Options for the fetcher function.
- `options.isOk` *Function* - A function to check if the response is valid.
- `options.getItems` *Function* - A function to get the array items from the response.
- `options.getNext` *Function* - A function to get the next page URL from the response.
- `options.getTotal` *Function* - A function to get the total number of items from the response.
- `options.pageSize` *number* - The number of items per page.
- `options.sleepTime=1000` *number* (optional) - The time to wait between requests in milliseconds.

**Returns:** *Function* - A function that fetches all pages from the API.
 * @throws {Error} Throws an error if the fetch fails or if the response structure is unexpected.

**Usage:**
```js
import { paginatedFetcher } from '@mhkeller/utils';
```

### pick

Creates a new object with only the specified keys from the source object

**Parameters:**
- `obj` *Record<string, any>* - The source object to filter
- `keys` *Array<string>* - The keys to include in the resulting object

**Returns:** *Record<string, any>* - A new object containing only the specified keys

**Usage:**
```js
import { pick } from '@mhkeller/utils';
```

### prettyMs

Take a number of milliseconds and return a human readable string

**Parameters:**
- `ms` *number* - Number of milliseconds

**Returns:** *string* - Human readable string

**Usage:**
```js
import { prettyMs } from '@mhkeller/utils';
```

### queueCalls

Queue calls to a function with a concurrency limit.

**Parameters:**
- `items` *Array<any>* - The parameters to pass to the function.
- `fn` *Function* - The function to call with each item.
- `concurrency=Infinity` *number* (optional) - The maximum number of concurrent calls.

**Returns:** *Promise<Array<any>>* - A promise that resolves to an array of results when all calls have completed.
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

**Usage:**
```js
import { queueCalls } from '@mhkeller/utils';
```

### readDataset

Reads a dataset from a file

**Parameters:**
- `filepath` *string* - Path to the dataset file

**Returns:** *{filepath: string, data: Array<any>* - } Object containing the filepath and the parsed data

**Usage:**
```js
import { readDataset } from '@mhkeller/utils';
```

### readXlsx

Read an XLSX file and return the data as a JSON object. If no `sheetName` is supplied, return the first sheet.

**Parameters:**
- `filepath` *string* - The path to the XLSX file.
- `sheetName` *string* (optional) - The name of the sheet to read.

**Returns:** *Array<Object>* - The data from the XLSX file as an array of objects.

**Usage:**
```js
import { readXlsx } from '@mhkeller/utils';
```

### requireArg

Require a command line argument and exit if it is not provided

**Parameters:**
- `msg` *string* - Error message to display if argument is missing
- `index` *number* - Index of the argument to require in process.argv

**Returns:** *string* - The required argument value, trimmed

**Usage:**
```js
import { requireArg } from '@mhkeller/utils';
```

### roundDecimal

Round a number to a specified number of decimal places

**Parameters:**
- `num` *number* - Number to round
- `dec=1` *number* (optional) - Number of decimal places to round to

**Returns:** *number* - The rounded number

**Usage:**
```js
import { roundDecimal } from '@mhkeller/utils';
```

### sleep

Sleep for a given amount of milliseconds

**Parameters:**
- `ms` *number* - Milliseconds to sleep
- `options` *Object* (optional) - Options object
- `options.log=true` *boolean* (optional) - Whether to log to console
- `options.indent=0` *number* (optional) - How many tabs to indent the notification by
- `options.jitter=0` *number* (optional) - A random percentage of this value in milliseconds to add to the sleep time

**Returns:** *Promise<void>* - A promise that resolves after the sleep time

**Usage:**
```js
import { sleep } from '@mhkeller/utils';
```

### sleepEvery

Sleep for a given amount of milliseconds every n-times

**Parameters:**
- `n` *number* - Every n-times (must be > 0)
- `ms` *number* - Milliseconds to sleep
- `i` *number* - Current iteration (0-based)
- `options` *object* (optional) - Options object
- `options.log=true` *boolean* (optional) - Whether to log to console
- `options.indent` *number* (optional) - How many tabs to indent the notification by
- `options.jitter=0` *number* (optional) - A random percentage of this value in milliseconds to the sleep time

**Returns:** *Promise<void>* - Promise that resolves when complete

**Usage:**
```js
import { sleepEvery } from '@mhkeller/utils';
```

### takeEvery

Take every nth element from a list, approximately dividing the list into n chunks

**Parameters:**
- `list` *Array<any>* - The input array
- `n` *number* - The target number of elements to return

**Returns:** *Array<any>* - A new array with approximately n elements taken at regular intervals

**Usage:**
```js
import { takeEvery } from '@mhkeller/utils';
```

### toTitleCase

Converts a string to title case

**Parameters:**
- `str` *string* - The string to convert

**Returns:** *string* - The converted string

**Usage:**
```js
import { toTitleCase } from '@mhkeller/utils';
```

### uniques

Calculate unique values from a list with an optional iterator string or function. By default return the transformed value if iteratee exists.

**Parameters:**
- `list` *Array<any>* - An array of values or objects.
- `accessor` *string|Function* (optional) - An optional accessor function that takes an object and returns the value to judge uniqueness by.
- `transform=true` *boolean* (optional) - If true, return the transformed value from accessor.

**Returns:** *Array<any>|null* - Array of unique values or null if input is not an array

**Usage:**
```js
import { uniques } from '@mhkeller/utils';
```

### writeSync

Write a data file

**Parameters:**
- `outpath` *string* - The path to write to
- `data` *Array<any>|Object* - The data to write
- `options` *Object* (optional) - Options object
- `options.indent` *number* (optional) - If writing a JSON file, the number that will be passed to JSON.stringify to pretty print the object
- `options.logIndent=0` *number* (optional) - How many tabs to indent the log

**Returns:** *void* - 

**Usage:**
```js
import { writeSync } from '@mhkeller/utils';
```

## Database Functions

### connectPg

Create a connection pool to a PostgreSQL database

**Parameters:**
- `config` *Object* - Configuration object
- `config.PG_HOST` *string* - PostgreSQL host
- `config.PG_DB` *string* - PostgreSQL database name
- `config.PG_USER` *string* - PostgreSQL username
- `config.PG_PW` *string* (optional) - PostgreSQL password
- `config.PG_PORT` *number* (optional) - PostgreSQL port

**Returns:** *pg.Pool* - PostgreSQL connection pool

**Usage:**
```js
import { connectPg } from '@mhkeller/utils/db';
```

### setTableUpdate

Set up a table for updating rows

**Parameters:**
- `tableName` *string* - Name of table to update
- `options` *object* - Options object
- `options.cols` *string[]* - Columns to update
- `options.idColumn='id'` *string* (optional) - Name of column to use as primary key
- `options.pool` *import('pg').Pool* (optional) - Existing PostgreSQL connection pool

**Returns:** *{pool: import('pg').Pool, updateRow: Function* - } - Pool and updateRow function

**Usage:**
```js
import { setTableUpdate } from '@mhkeller/utils/db';
```

### setTableUpload

Set up a table for uploading

**Parameters:**
- `tableName` *string* - Name of table to upload to
- `options` *object* - Options object
- `options.cols` *string[]* - Columns to upload
- `options.idColumn='id'` *string* (optional) - Name of column to use as primary key
- `options.logEvery=1_500` *number* (optional) - How often to log
- `options.total` *number* (optional) - Total number of rows to upload
- `options.indent` *number* (optional) - How much to indent logs
- `options.mapRow` *function* (optional) - Function to map each row before uploading

**Returns:** *Promise<{pool: import('pg').Pool, uploadRow: Function* - >} - Pool and uploadRow function

**Usage:**
```js
import { setTableUpload } from '@mhkeller/utils/db';
```

### uploadRows

Uploads rows to a table

**Parameters:**
- `tableName` *string* - Name of table to upload to
- `rows` *object[]|string[]* - Rows to upload. If an array of strings, must also provide `mapRow` option
- `options` *object* (optional) - Options object
- `options.idColumn='id'` *string* (optional) - Name of column to use as primary key
- `options.mapRow` *function* (optional) - Function to map each row before uploading
- `options.indent=3` *number* (optional) - How much to indent logs
- `options.uploadConcurrency=1500` *number* (optional) - Number of concurrent uploads

**Returns:** *Promise<void>* - Promise that resolves when upload is complete

**Usage:**
```js
import { uploadRows } from '@mhkeller/utils/db';
```

## Web Scraping Functions

### launchBrowser

Launch a browser using Playwright

**Parameters:**
- `options` *Object* (optional) - Browser launch options
- `options.headless=true` *boolean* (optional) - Whether to run browser in headless mode
- `options.viewport` *Object* (optional) - Viewport dimensions
- `options.viewport.width=1080` *number* (optional) - Viewport width in pixels
- `options.viewport.height=875` *number* (optional) - Viewport height in pixels

**Returns:** *Promise<{browser: import('playwright').Browser, page: import('playwright').Page* - >} - Browser and page instances

**Usage:**
```js
import { launchBrowser } from '@mhkeller/utils/scrape';
```

### screenshotPage

Wait for a specified time on a page

**Parameters:**
- `page` *import('playwright').Page* - Playwright page instance
- `ms` *number* - Time to wait in milliseconds
- `msg=''` *string* (optional) - Optional message to display while waiting

**Returns:** *Promise<void>* - Promise that resolves when waiting is complete

**Usage:**
```js
import { screenshotPage } from '@mhkeller/utils/scrape';
```

### wait

Create a function to wait for a specified amount of time on a page

**Parameters:**
- `page` *import('playwright').Page* - The puppeteer or playwright page object

**Returns:** *Function* - A function that waits for a specified amount of time

**Usage:**
```js
import { wait } from '@mhkeller/utils/scrape';
```

