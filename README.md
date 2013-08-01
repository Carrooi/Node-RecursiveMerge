# Recursive merge

Recursive merge tool for arrays and objects

## Changelog

Changelog is in the bottom of this readme.

## Usage

With this tool, you can recursivelly merge arrays or objects.

```
var merge = require('merge');

var result = merge(
	[1, 1, 2, 3],
	[3, 4, 4, 5],
	[10, 9, 8, 1]
);				// result: [1, 1, 2, 3, 3, 4, 4, 5, 10, 9, 8, 1]
```

As you can see, this library just merging objects and not removing duplicates.

You should also know, that this affects first object passed to merge function. Overy other objects (arrays, objects) are
added to the first one. There is not any fast simple and universal solution for cloning objects (arrays yes).

In the same way, you can merge also objects.

If you will try to merge two different types of objects, exception will be thrown. Also if you will try to merge other
objects than arrays or objects, exception will be also thrown.

## Changelog

* 1.0.0
	+ Initial first version