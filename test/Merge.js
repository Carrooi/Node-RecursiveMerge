(function () {

	var should = require('should');
	var merge = require('../lib/Merge');

	describe('Merge', function() {

		it('should throw error if objects are not of the same type', function() {
			(function() { merge([], {}); }).should.throw();
		});

		it('should throw error if objects are not arrays or objects', function() {
			(function() {
				merge('', '');
				merge(1, 1);
				merge(true, true);
			}).should.throw();
		});

		it('should return merged arrays', function() {
			merge(
				[1, 2, 3],
				[1, 2, 3, 4, 5]
			).should.eql([1, 2, 3, 1, 2, 3, 4, 5]);
			merge(
				[[1, 2, 3], [4, 5, 6]],
				[[7, 8, 9], [10, 11, 12]]
			).should.eql([[1, 2, 3, 7, 8, 9], [4, 5, 6, 10, 11, 12]]);
			merge(
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
				[10, 11, 12]
			).should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		});

		it('should return merged objects', function() {
			merge(
				{hello: 'world'},
				{world: 'hello'}
			).should.eql({hello: 'world', world: 'hello'});
			merge(
				{one: {two: 2, three: 3}, four: {five: 5, six: 6}},
				{seven: {eight: 8, nine: 9}, one: {ten: 10, eleven: 11}}
			).should.eql({
				one: {two: 2, three: 3, ten: 10, eleven: 11}, four: {five: 5, six: 6}, seven: {eight: 8, nine: 9}
			});
			merge(
				{one: 1},
				{two: 2},
				{three: 3},
				{four: 4}
			).should.eql({one: 1, two: 2, three: 3, four: 4});
		});

	});

})();