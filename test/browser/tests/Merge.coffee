merge = require '/lib/Merge'

describe 'Merge', ->

	it 'should throw error if objects are not of the same type', ->
		expect( -> merge([], {})).to.throw(Error, 'Can not merge [object Array] with [object Object].')

	it 'should throw error if objects are not arrays or objects', ->
		expect( -> merge('', '')).to.throw(Error, 'Can not merge [object String] objects.')
		expect( -> merge(1, 1)).to.throw(Error, 'Can not merge [object Number] objects.')
		expect( -> merge(true, true)).to.throw(Error, 'Can not merge [object Boolean] objects.')

	it 'should return merged arrays', ->
		expect(merge(
			[1, 2, 3],
			[1, 2, 3, 4, 5]
		)).to.be.eql([1, 2, 3, 1, 2, 3, 4, 5])

		expect(merge(
			[[1, 2, 3], [4, 5, 6]]
			[[7, 8, 9], [10, 11, 12]]
		)).to.be.eql([[1, 2, 3, 7, 8, 9], [4, 5, 6, 10, 11, 12]])

		expect(merge(
			[1, 2, 3]
			[4, 5, 6]
			[7, 8, 9]
			[10, 11, 12]
		)).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

		expect(merge(
			[one: 1, two: 2, three: 3]
			[four: 4, five: 5, six: 6]
			[7, 8, 9]
			[10, 11, 12]
		)).to.be.eql([one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, 7, 8, 9, 10, 11, 12])

	it 'should return merged objects', ->
		expect(merge(
			{hello: 'world'}
			{world: 'hello'}
		)).to.be.eql(hello: 'world', world: 'hello')

		expect(merge(
			{one: {two: 2, three: 3}, four: {five: 5, six: 6}}
			{seven: {eight: 8, nine: 9}, one: {ten: 10, eleven: 11}}
		)).to.be.eql(one: {two: 2, three: 3, ten: 10, eleven: 11}, four: {five: 5, six: 6}, seven: {eight: 8, nine: 9})

		expect(merge(
			{one: 1}
			{two: 2}
			{three: 3}
			{four: 4}
		)).to.be.eql(one: 1, two: 2, three: 3, four: 4)

		expect(merge(
			{one: [1]}
			{two: [2]}
			{three: [3]}
			{four: [4]}
		)).to.be.eql(one: [1], two: [2], three: [3], four: [4])