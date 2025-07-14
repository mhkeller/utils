# File & Data

Functions for reading, writing, and processing data files.

## fetchData

**File:** `lib/fetchData.js`

Fetches data from a given URL using the native fetch API.

**Parameters:**
- `url` (string) - The URL to fetch data from.

**Returns:**
- Promise(object) - A promise that resolves with the parsed JSON data.

**Example:**
```js
import { fetchData } from '@mhkeller/utils'

// Usage example for fetchData
```

## formatParams

**File:** `lib/formatParams.js`

Format params to be used in a URL

**Parameters:**
- `params` (Object) - The parameters to format

**Returns:**
- string - The query parametrized string

**Example:**
```js
import { formatParams } from '@mhkeller/utils'

// Usage example for formatParams
```

## genDirs

**File:** `lib/genDirs.js`

Generate the input and output directory filepaths

**Parameters:**
- `importMeta` (ImportMeta) - The import.meta object
- `baseDir=''` (string, optional) - The base directory

**Returns:**
- {inDir: string, outDir: string - } An object with the input and output directory filepaths

**Example:**
```js
import { genDirs } from '@mhkeller/utils'

// Usage example for genDirs
```

## readDataset

**File:** `lib/readDataset.js`

Reads a dataset from a file

**Parameters:**
- `filepath` (string) - Path to the dataset file

**Returns:**
- {filepath: string, data: Array(any) - } Object containing the filepath and the parsed data

**Example:**
```js
import { readDataset } from '@mhkeller/utils'

// Usage example for readDataset
```

## readXlsx

**File:** `lib/readXlsx.js`

Read an XLSX file and return the data as a JSON object. If no `sheetName` is supplied, return the first sheet.

**Parameters:**
- `filepath` (string) - The path to the XLSX file.
- `sheetName` (string, optional) - The name of the sheet to read.

**Returns:**
- Array(Object) - The data from the XLSX file as an array of objects.

**Example:**
```js
import { readXlsx } from '@mhkeller/utils'

// Usage example for readXlsx
```

## writeSync

**File:** `lib/writeSync.js`

Write a data file

**Parameters:**
- `outpath` (string) - The path to write to
- `data` (Array(any) or Object) - The data to write
- `options` (Object, optional) - Options object
- `options.indent` (number, optional) - If writing a JSON file, the number that will be passed to JSON.stringify to pretty print the object
- `options.logIndent=0` (number, optional) - How many tabs to indent the log

**Returns:**
- void - 

**Example:**
```js
import { writeSync } from '@mhkeller/utils'

// Usage example for writeSync
```

