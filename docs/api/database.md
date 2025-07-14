# Database Functions

Utilities for working with PostgreSQL and other databases.

## connectPg

**File:** `db/connectPg.js`

Create a connection pool to a PostgreSQL database

**Parameters:**
- `config` (Object) - Configuration object
- `config.PG_HOST` (string) - PostgreSQL host
- `config.PG_DB` (string) - PostgreSQL database name
- `config.PG_USER` (string) - PostgreSQL username
- `config.PG_PW` (string, optional) - PostgreSQL password
- `config.PG_PORT` (number, optional) - PostgreSQL port

**Returns:**
- pg.Pool - PostgreSQL connection pool

**Example:**
```js
import { connectPg } from '@mhkeller/utils'

// Usage example for connectPg
```

## setTableUpload

**File:** `db/setTableUpload.js`

Set up a table for uploading

**Parameters:**
- `tableName` (string) - Name of table to upload to
- `options` (object) - Options object
- `options.cols` (string[]) - Columns to upload
- `options.idColumn='id'` (string, optional) - Name of column to use as primary key
- `options.logEvery=1_500` (number, optional) - How often to log
- `options.total` (number, optional) - Total number of rows to upload
- `options.indent` (number, optional) - How much to indent logs
- `options.mapRow` (function, optional) - Function to map each row before uploading

**Returns:**
- PromiseObject with pool: Pool, uploadRow: Function - > - Pool and uploadRow function

**Example:**
```js
import { setTableUpload } from '@mhkeller/utils'

// Usage example for setTableUpload
```

## uploadRows

**File:** `db/uploadRows.js`

Uploads rows to a table

**Parameters:**
- `tableName` (string) - Name of table to upload to
- `rows` (object[] or string[]) - Rows to upload. If an array of strings, must also provide `mapRow` option
- `options` (object, optional) - Options object
- `options.idColumn='id'` (string, optional) - Name of column to use as primary key
- `options.mapRow` (function, optional) - Function to map each row before uploading
- `options.indent=3` (number, optional) - How much to indent logs
- `options.uploadConcurrency=1500` (number, optional) - Number of concurrent uploads

**Returns:**
- Promise(void) - Promise that resolves when upload is complete

**Example:**
```js
import { uploadRows } from '@mhkeller/utils'

// Usage example for uploadRows
```

