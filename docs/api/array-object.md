# Array & Object Utils

Functions for working with arrays, objects, and data structures.

## createLookup

**File:** `lib/createLookup.js`

Creates a Map lookup from an array of objects

**Parameters:**
- `list` (Array(Object)) - The array of objects to create a lookup from
- `key` (string) - The key in each object to use as the Map key

**Returns:**
- Map(any, Object) - A Map where the keys are the values of the specified property and the values are the original objects

**Example:**
```js
import { createLookup } from '@mhkeller/utils'

// Usage example for createLookup
```

## makeArray

**File:** `lib/makeArray.js`

Make an array of n elements

**Parameters:**
- `n` (number) - The number of elements

**Returns:**
- Array(undefined) - An array of n undefined elements

**Example:**
```js
import { makeArray } from '@mhkeller/utils'

// Usage example for makeArray
```

## pick

**File:** `lib/pick.js`

Creates a new object with only the specified keys from the source object

**Parameters:**
- `obj` (Record(string, any)) - The source object to filter
- `keys` (Array(string)) - The keys to include in the resulting object

**Returns:**
- Record(string, any) - A new object containing only the specified keys

**Example:**
```js
import { pick } from '@mhkeller/utils'

// Usage example for pick
```

## takeEvery

**File:** `lib/takeEvery.js`

Take every nth element from a list, approximately dividing the list into n chunks

**Parameters:**
- `list` (Array(any)) - The input array
- `n` (number) - The target number of elements to return

**Returns:**
- Array(any) - A new array with approximately n elements taken at regular intervals

**Example:**
```js
import { takeEvery } from '@mhkeller/utils'

// Usage example for takeEvery
```

## uniques

**File:** `lib/uniques.js`

Calculate unique values from a list with an optional iterator string or function. By default return the transformed value if iteratee exists.

**Parameters:**
- `list` (Array(any)) - An array of values or objects.
- `accessor` (string or Function, optional) - An optional accessor function that takes an object and returns the value to judge uniqueness by.
- `transform=true` (boolean, optional) - If true, return the transformed value from accessor.

**Returns:**
- Array(any) or null - Array of unique values or null if input is not an array

**Example:**
```js
import { uniques } from '@mhkeller/utils'

// Usage example for uniques
```

