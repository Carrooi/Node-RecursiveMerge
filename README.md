# Recursive merge

Recursive merge tool for arrays and objects.

## Installation

```
$ npm install recursive-merge
```

## Usage

With this tool, you can recursively merge arrays or objects.

```
var merge = require('merge');

var result = merge(
	[1, 1, 2, 3],
	[3, 4, 4, 5],
	[10, 9, 8, 1]
);				// result: [1, 1, 2, 3, 3, 4, 4, 5, 10, 9, 8, 1]
```

As you can see, this library just merging objects and not removing duplicates.

You should also know, that this affects first object passed to merge function. Every other objects (arrays, objects) are
added to the first one. There is not any fast simple and universal solution for cloning objects (arrays yes).

In the same way, you can merge also objects.

If you will try to merge two different types of objects, exception will be thrown. Also if you will try to merge other
objects than arrays or objects, exception will be also thrown.

## Tests

```
$ npm test
```

## Changelog

* 1.1.0 - 1.1.1
	+ Rewritten tests
	+ Using chai for assertion (not should)
	+ Added some tests
	+ Added tests for browser

* 1.0.0
	+ Initial first version