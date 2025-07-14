# Web Scraping Functions

Utilities for browser automation and web scraping.

## launchBrowser

**File:** `scrape/launchBrowser.js`

Launch a browser using Playwright

**Parameters:**
- `options` (Object, optional) - Browser launch options
- `options.headless=true` (boolean, optional) - Whether to run browser in headless mode
- `options.viewport` (Object, optional) - Viewport dimensions
- `options.viewport.width=1080` (number, optional) - Viewport width in pixels
- `options.viewport.height=875` (number, optional) - Viewport height in pixels

**Returns:**
- PromiseObject with browser: Browser, page: Page - > - Browser and page instances

**Example:**
```js
import { launchBrowser } from '@mhkeller/utils'

// Usage example for launchBrowser
```

## screenshotPage

**File:** `scrape/screenshotPage.js`

Wait for a specified time on a page

**Parameters:**
- `page` (Page) - Playwright page instance
- `ms` (number) - Time to wait in milliseconds
- `msg=''` (string, optional) - Optional message to display while waiting

**Returns:**
- Promise(void) - Promise that resolves when waiting is complete

**Example:**
```js
import { screenshotPage } from '@mhkeller/utils'

// Usage example for screenshotPage
```

## wait

**File:** `scrape/wait.js`

Create a function to wait for a specified amount of time on a page

**Parameters:**
- `page` (Page) - The puppeteer or playwright page object

**Returns:**
- Function - A function that waits for a specified amount of time

**Example:**
```js
import { wait } from '@mhkeller/utils'

// Usage example for wait
```

