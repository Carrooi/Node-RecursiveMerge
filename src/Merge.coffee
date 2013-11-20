merge = (left, right) ->
	type = Object.prototype.toString
	leftType = type.call(left)
	rightType = type.call(right)

	if leftType != rightType
		throw new Error 'Can not merge ' + leftType + ' with ' + rightType + '.'

	switch leftType
		when '[object Array]'
			for value, i in right
				valueType = type.call(value)
				if valueType == '[object Array]' || valueType == '[object Object]'
					left[i] = merge(left[i], value)
				else
					left.push(value)

		when '[object Object]'
			for name, value of right
				valueType = type.call(value)
				if typeof left[name] == 'undefined'
					left[name] = value
				else if valueType == '[object Array]' || valueType == '[object Object]'
					left[name] = merge(left[name], value)

		else
			throw new Error 'Can not merge ' + leftType + ' objects.'

	return left


module.exports = (left, right...) ->
	for r in right
		left = merge(left, r)

	return left