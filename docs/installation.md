# Installation

Install the package using npm:

```bash
npm install @mhkeller/utils
```

## Import Styles

### Individual Functions
```js
import { commas, sleep, initLogProgress } from '@mhkeller/utils'
```

### Database Functions  
```js
import { uploadRows, setTableUpload } from '@mhkeller/utils/db'
```

### Web Scraping Functions
```js
import { launchBrowser, screenshotPage } from '@mhkeller/utils/scrape'
```

### All Functions
```js
import * as utils from '@mhkeller/utils'
```

## Dependencies

This package has several peer dependencies that you may need to install depending on which functions you use:

### Database Functions
- `pg` - PostgreSQL client
- `better-sqlite3` - SQLite database

### Web Scraping Functions  
- `playwright` - Browser automation

### File Processing
- `xlsx` - Excel file processing

### Example Installation
```bash
# For database operations
npm install pg better-sqlite3

# For web scraping  
npm install playwright

# For Excel file processing
npm install xlsx
```

## TypeScript Support

The package includes TypeScript definitions and JSDoc comments for excellent IDE support and type checking.
