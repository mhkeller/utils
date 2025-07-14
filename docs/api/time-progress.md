# Time & Progress

Functions for time handling, delays, and progress tracking.

## getNow

**File:** `lib/getNow.js`

Returns the current date and time as a string.

**Returns:**
- string - The current date and time as a string

**Example:**
```js
import { getNow } from '@mhkeller/utils'

// Usage example for getNow
```

## initLogProgress

**File:** `lib/initLogProgress.js`

Logs progress in loop to the console every n-times. Also logs the last iteration. It also displays how much time is left in the process by calculating the average time per iteration.

**Parameters:**
- `total` (number) - The total number of iterations in the loop.
- `options` (object, optional) - Options object
- `options.every=1` (number, optional) - How many times to log the progress.

**Returns:**
- Function - A function that logs the progress in the loop.

**Example:**
```js
import { initLogProgress } from '@mhkeller/utils'

// Usage example for initLogProgress
```

## sleep

**File:** `lib/sleep.js`

Sleep for a given amount of milliseconds

**Parameters:**
- `ms` (number) - Milliseconds to sleep
- `options` (Object, optional) - Options object
- `options.log=true` (boolean, optional) - Whether to log to console
- `options.indent=0` (number, optional) - How many tabs to indent the notification by
- `options.jitter=0` (number, optional) - A random percentage of this value in milliseconds to add to the sleep time

**Returns:**
- Promise(void) - A promise that resolves after the sleep time

**Example:**
```js
import { sleep } from '@mhkeller/utils'

// Usage example for sleep
```

## sleepEvery

**File:** `lib/sleepEvery.js`

Sleep for a given amount of milliseconds every n-times

**Parameters:**
- `n` (number) - Every n-times (must be > 0)
- `ms` (number) - Milliseconds to sleep
- `i` (number) - Current iteration (0-based)
- `options` (object, optional) - Options object
- `options.log=true` (boolean, optional) - Whether to log to console
- `options.indent` (number, optional) - How many tabs to indent the notification by
- `options.jitter=0` (number, optional) - A random percentage of this value in milliseconds to the sleep time

**Returns:**
- Promise(void) - Promise that resolves when complete

**Example:**
```js
import { sleepEvery } from '@mhkeller/utils'

// Usage example for sleepEvery
```

