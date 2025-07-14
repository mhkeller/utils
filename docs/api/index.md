# API Reference

This section contains detailed documentation for all functions in @mhkeller/utils, organized by category.

## Categories

- **[Array & Object Utils](./array-object)** - Functions for working with arrays, objects, and data structures
- **[String Utils](./string)** - Functions for string manipulation and formatting  
- **[Number Utils](./number)** - Functions for number formatting and mathematical operations
- **[Time & Progress](./time-progress)** - Functions for time handling, delays, and progress tracking
- **[File & Data](./file-data)** - Functions for reading, writing, and processing data files
- **[General Utilities](./utilities)** - Miscellaneous utility functions
- **[Database Functions](./database)** - PostgreSQL utilities and helpers
- **[SQLite Functions](./sqlite)** - SQLite database utilities
- **[Web Scraping](./scraping)** - Browser automation and screenshot tools

## Quick Reference

All functions are exported from the main module:

```js
import { 
  commas, sleep, initLogProgress,
  readXlsx, writeSync, checkIsTrue
} from '@mhkeller/utils'
```

Database and scraping functions are in separate modules:

```js
import { uploadRows, setTableUpload } from '@mhkeller/utils/db'
import { launchBrowser, screenshotPage } from '@mhkeller/utils/scrape'
```

_Note: All functions within each category are listed alphabetically for easy reference._
