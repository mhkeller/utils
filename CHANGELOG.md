Changelog
===

# 7.1.0

> 2024-06-03

Makes the `waitUntil` option in `screenshotPage` configurable. Also adds an aggressive z-index to make sure timestamp shows up on top.

* [9c125285196e496684e0790ac0eb519fe7857ddb](https://github.com/mhkeller/utils/commit/9c125285196e496684e0790ac0eb519fe7857ddb)
* [56b4d04f794329e3aeed4d85c737cf957b36c59e](https://github.com/mhkeller/utils/commit/56b4d04f794329e3aeed4d85c737cf957b36c59e)

# 7.0.0

> 2024-06-03

Rename `logProgress` to `initLogProgress` and change it to a curried function.

**Usage:**

```js
const logProgress = initLogProgress(data.length);

for (const row of data) {
	logProgress({ every: 1 });
}
```

* [524f9e4e94da5671da7c5f85e25c2ed7f5a3b6aa](https://github.com/mhkeller/utils/commit/524f9e4e94da5671da7c5f85e25c2ed7f5a3b6aa)

# 6.1.0

> 2024-05-17

Add the `showRate` option to `logProgress` to show how many requests are being paid per second. Updates to xlsx 0.20.2

* [33c580f9a5159d4cbfcc3581c129011a8fae68f3](https://github.com/mhkeller/utils/commit/33c580f9a5159d4cbfcc3581c129011a8fae68f3)
* [845f85c661d625c06d77ebbe53e45eb3687a300a](https://github.com/mhkeller/utils/commit/845f85c661d625c06d77ebbe53e45eb3687a300a)

# 6.0.1

> 2023-07-11

Removes batches from uploading to db. Also allows you to set concurrency and reports back how many were added versus existed already.

*Breaking changes*

1. `setTableUpload` now takes an object as second arg insetad of `cols`, which is now a field of that object.

* [PR #1](https://github.com/mhkeller/utils/pull/1)

# 5.2.1

> 2023-07-11

* Export `makeIndent`, `queueCalls` and `sleepEvery` functions.

* [0d07755cd998d6107ff8a6d09ec3e09618a69859](https://github.com/mhkeller/utils/commit/0d07755cd998d6107ff8a6d09ec3e09618a69859)

# 5.2.0

> 2023-06-09

* Add the `queueCalls` function. 
* Allow for `logProgress` to have custom messages and add configurable indent to `logProgress`. 
* Show millieseconds in `prettyMs`. 
* Add `jitter` option to `sleep`. 
* Update docs to `logProgress` and return a boolean whether the log occurred. 
* Create the `makeIndent` function. 
* Add jobId to `logProgress`.
* Create `sleepEvery`.
* Change install location of `xlsx` per https://github.com/SheetJS/sheetjs/issues/2822

* [d29c55c2256da8390b8822579ff44ae474138852](https://github.com/mhkeller/utils/commit/d29c55c2256da8390b8822579ff44ae474138852)
* [0cca4f0b8270d77b6dec052760a7b7900bc2dd40](https://github.com/mhkeller/utils/commit/0cca4f0b8270d77b6dec052760a7b7900bc2dd40)
* [09aaf5ae53a620ced2c0fb56776a557faa531562](https://github.com/mhkeller/utils/commit/09aaf5ae53a620ced2c0fb56776a557faa531562)
* [94737931ae95da87549196b3a0a18aa16fba05a1](https://github.com/mhkeller/utils/commit/94737931ae95da87549196b3a0a18aa16fba05a1)
* [dedc6cb9f381b7aaad5dbad3ad585ec751cf432d](https://github.com/mhkeller/utils/commit/dedc6cb9f381b7aaad5dbad3ad585ec751cf432d)
* [011d986fb51ca1df9d3eee277623b85fca097cda](https://github.com/mhkeller/utils/commit/011d986fb51ca1df9d3eee277623b85fca097cda)
* [080a559bac3fe9068a875844ce725fd32b527b1a](https://github.com/mhkeller/utils/commit/080a559bac3fe9068a875844ce725fd32b527b1a)
* [d7bbc7aa61f01b8ca24a8f6b7419f611398ca5bc](https://github.com/mhkeller/utils/commit/d7bbc7aa61f01b8ca24a8f6b7419f611398ca5bc)
* [ccbd8568b5dca0372a64bfcebdec5b1fc5ed2aae](https://github.com/mhkeller/utils/commit/ccbd8568b5dca0372a64bfcebdec5b1fc5ed2aae)
* [c3b9621f32ab821ff1589ce4295ca9f516f4aa16](https://github.com/mhkeller/utils/commit/c3b9621f32ab821ff1589ce4295ca9f516f4aa16)

# 5.1.0

> 2023-05-25

Add the `roundDecimel` function, use this in prettyMs.

* [e1d8e8016338e27e6048a62de4eb84191d1431af](https://github.com/mhkeller/utils/commit/e1d8e8016338e27e6048a62de4eb84191d1431af)

# 5.0.1

> 2023-05-24

Remove unnecessary row from `logProgress`

* [bb25dab2fe653854b330ed43406317ba7ce4cb97](https://github.com/mhkeller/utils/commit/bb25dab2fe653854b330ed43406317ba7ce4cb97)

# 5.0.0

> 2023-05-24

Reorganize into `/scrape` and `/db` exports

