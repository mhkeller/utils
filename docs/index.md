# @mhkeller/utils

A comprehensive collection of utility functions for JavaScript/Node.js projects, including database operations, web scraping, and common data manipulation tasks.

## Features

- **Database utilities** - PostgreSQL and SQLite helpers
- **Web scraping** - Browser automation and screenshot tools  
- **Data processing** - CSV/Excel reading, data transformation
- **Progress tracking** - Logging and progress indicators
- **String & number utilities** - Formatting, validation, conversion
- **Async helpers** - Sleep, queuing, pagination

## Quick Start

```js
import { commas, sleep, initLogProgress } from '@mhkeller/utils'

// Format numbers with commas
console.log(commas(1234567)) // "1,234,567"

// Sleep with logging
await sleep(1000) // Sleeps for 1 second

// Track progress in loops
const logProgress = initLogProgress(data.length)
for (const [i, item] of data.entries()) {
  // Process item...
  logProgress({ msg: 'Processing items' })
}
```

## Database Operations

```js
import { uploadRows } from '@mhkeller/utils/db'

// Upload data to PostgreSQL
await uploadRows('my_table', data, {
  idColumn: 'id',
  uploadConcurrency: 1000
})
```

## Web Scraping

```js
import { launchBrowser, screenshotPage } from '@mhkeller/utils/scrape'

const { browser, page } = await launchBrowser()
await screenshotPage(page, 'https://example.com', {
  path: 'screenshot.png'
})
```

::: tip
All functions include comprehensive JSDoc documentation with TypeScript types for better IDE support.
:::

## License

ISC
