/** Generated by SimQ **/
/** modules **/

// Generated by CoffeeScript 1.6.3
(function() {
  var SUPPORTED, cache, modules, require, resolve, stats;

  if (!this.require) {
    SUPPORTED = ['js', 'json', 'ts', 'coffee', 'eco'];
    modules = {};
    stats = {};
    cache = {};
    require = function(name, parent) {
      var fullName, m;
      if (parent == null) {
        parent = null;
      }
      fullName = resolve(name, parent);
      if (fullName === null) {
        throw new Error('Module ' + name + ' was not found.');
      }
      if (typeof cache[fullName] === 'undefined') {
        m = {
          exports: {},
          id: fullName,
          filename: fullName,
          loaded: false,
          parent: null,
          children: null
        };
        modules[fullName].apply(modules[fullName], [m.exports, m]);
        m.loaded = true;
        cache[fullName] = m;
      }
      if (typeof stats[fullName] === 'undefined') {
        stats[fullName] = {
          atime: null,
          mtime: null,
          ctime: null
        };
      }
      stats[fullName].atime = new Date;
      return cache[fullName].exports;
    };
    resolve = function(name, parent) {
      var ext, num, part, parts, prev, result, _i, _j, _k, _len, _len1, _len2;
      if (parent == null) {
        parent = null;
      }
      if (parent !== null && name[0] === '.') {
        num = parent.lastIndexOf('/');
        if (num !== -1) {
          parent = parent.substr(0, num);
        }
        name = parent + '/' + name;
        parts = name.split('/');
        result = [];
        prev = null;
        for (_i = 0, _len = parts.length; _i < _len; _i++) {
          part = parts[_i];
          if (part === '.' || part === '') {
            continue;
          } else if (part === '..' && prev) {
            result.pop();
          } else {
            result.push(part);
          }
          prev = part;
        }
        name = result.join('/');
        if (parent[0] === '/') {
          name = '/' + name;
        }
      }
      if (typeof modules[name] !== 'undefined') {
        return name;
      }
      for (_j = 0, _len1 = SUPPORTED.length; _j < _len1; _j++) {
        ext = SUPPORTED[_j];
        if (typeof modules[name + '.' + ext] !== 'undefined') {
          return name + '.' + ext;
        }
      }
      for (_k = 0, _len2 = SUPPORTED.length; _k < _len2; _k++) {
        ext = SUPPORTED[_k];
        if (typeof modules[name + '/index.' + ext] !== 'undefined') {
          return name + '/index.' + ext;
        }
      }
      return null;
    };
    this.require = function(name, parent) {
      if (parent == null) {
        parent = null;
      }
      return require(name, parent);
    };
    this.require.simq = true;
    this.require.version = 1;
    this.require.resolve = function(name, parent) {
      if (parent == null) {
        parent = null;
      }
      return resolve(name, parent);
    };
    this.require.define = function(bundle) {
      var m, name, _results;
      _results = [];
      for (name in bundle) {
        m = bundle[name];
        _results.push(modules[name] = m);
      }
      return _results;
    };
    this.require.release = function() {
      var name, _results;
      _results = [];
      for (name in cache) {
        _results.push(delete cache[name]);
      }
      return _results;
    };
    this.require.getStats = function(name, parent) {
      var fullName;
      if (parent == null) {
        parent = null;
      }
      fullName = resolve(name, parent);
      if (fullName === null) {
        throw new Error('Module ' + name + ' was not found.');
      }
      if (typeof stats[fullName] === 'undefined') {
        stats[fullName] = {
          atime: null,
          mtime: null,
          ctime: null
        };
      }
      return stats[fullName];
    };
    this.require.__setStats = function(bundle) {
      var data, name, _results;
      _results = [];
      for (name in bundle) {
        data = bundle[name];
        _results.push(stats[name] = {
          atime: new Date(data.atime),
          mtime: new Date(data.mtime),
          ctime: new Date(data.ctime)
        });
      }
      return _results;
    };
    this.require.cache = cache;
  }

  return this.require.define;

}).call(this)({
 '/lib/Merge.js': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/lib/Merge.js');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/lib/Merge.js';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/lib/Merge.js';
	var __dirname = '/lib';
	var process = {cwd: function() {return '/';}, argv: ['node', '/lib/Merge.js'], env: {}};

	/** code **/
	// Generated by CoffeeScript 1.6.3
	(function() {
	  var merge,
	    __slice = [].slice;
	
	  merge = function(left, right) {
	    var i, leftType, name, rightType, type, value, valueType, _i, _len;
	    type = Object.prototype.toString;
	    leftType = type.call(left);
	    rightType = type.call(right);
	    if (leftType !== rightType) {
	      throw new Error('Can not merge ' + leftType + ' with ' + rightType + '.');
	    }
	    switch (leftType) {
	      case '[object Array]':
	        for (i = _i = 0, _len = right.length; _i < _len; i = ++_i) {
	          value = right[i];
	          valueType = type.call(value);
	          if (valueType === '[object Array]' || valueType === '[object Object]') {
	            left[i] = merge(left[i], value);
	          } else {
	            left.push(value);
	          }
	        }
	        break;
	      case '[object Object]':
	        for (name in right) {
	          value = right[name];
	          valueType = type.call(value);
	          if (typeof left[name] === 'undefined') {
	            left[name] = value;
	          } else if (valueType === '[object Array]' || valueType === '[object Object]') {
	            left[name] = merge(left[name], value);
	          }
	        }
	        break;
	      default:
	        throw new Error('Can not merge ' + leftType + ' objects.');
	    }
	    return left;
	  };
	
	  module.exports = function() {
	    var left, r, right, _i, _len;
	    left = arguments[0], right = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    for (_i = 0, _len = right.length; _i < _len; _i++) {
	      r = right[_i];
	      left = merge(left, r);
	    }
	    return left;
	  };
	
	}).call(this);
	

}, '/test/browser/tests/Merge.coffee': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/test/browser/tests/Merge.coffee');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/test/browser/tests/Merge.coffee';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/test/browser/tests/Merge.coffee';
	var __dirname = '/test/browser/tests';
	var process = {cwd: function() {return '/';}, argv: ['node', '/test/browser/tests/Merge.coffee'], env: {}};

	/** code **/
	(function() {
	  var merge;
	
	  merge = require('/lib/Merge');
	
	  describe('Merge', function() {
	    it('should throw error if objects are not of the same type', function() {
	      return expect(function() {
	        return merge([], {});
	      }).to["throw"](Error, 'Can not merge [object Array] with [object Object].');
	    });
	    it('should throw error if objects are not arrays or objects', function() {
	      expect(function() {
	        return merge('', '');
	      }).to["throw"](Error, 'Can not merge [object String] objects.');
	      expect(function() {
	        return merge(1, 1);
	      }).to["throw"](Error, 'Can not merge [object Number] objects.');
	      return expect(function() {
	        return merge(true, true);
	      }).to["throw"](Error, 'Can not merge [object Boolean] objects.');
	    });
	    it('should return merged arrays', function() {
	      expect(merge([1, 2, 3], [1, 2, 3, 4, 5])).to.be.eql([1, 2, 3, 1, 2, 3, 4, 5]);
	      expect(merge([[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]])).to.be.eql([[1, 2, 3, 7, 8, 9], [4, 5, 6, 10, 11, 12]]);
	      return expect(merge([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12])).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	    });
	    return it('should return merged objects', function() {
	      expect(merge({
	        hello: 'world'
	      }, {
	        world: 'hello'
	      })).to.be.eql({
	        hello: 'world',
	        world: 'hello'
	      });
	      expect(merge({
	        one: {
	          two: 2,
	          three: 3
	        },
	        four: {
	          five: 5,
	          six: 6
	        }
	      }, {
	        seven: {
	          eight: 8,
	          nine: 9
	        },
	        one: {
	          ten: 10,
	          eleven: 11
	        }
	      })).to.be.eql({
	        one: {
	          two: 2,
	          three: 3,
	          ten: 10,
	          eleven: 11
	        },
	        four: {
	          five: 5,
	          six: 6
	        },
	        seven: {
	          eight: 8,
	          nine: 9
	        }
	      });
	      return expect(merge({
	        one: 1
	      }, {
	        two: 2
	      }, {
	        three: 3
	      }, {
	        four: 4
	      })).to.be.eql({
	        one: 1,
	        two: 2,
	        three: 3,
	        four: 4
	      });
	    });
	  });
	
	}).call(this);
	

}, '/package.json': function(exports, module) {

	/** node globals **/
	var require = function(name) {return window.require(name, '/package.json');};
	require.resolve = function(name, parent) {if (parent === null) {parent = '/package.json';} return window.require.resolve(name, parent);};
	require.define = function(bundle) {window.require.define(bundle);};
	require.cache = window.require.cache;
	var __filename = '/package.json';
	var __dirname = '/';
	var process = {cwd: function() {return '/';}, argv: ['node', '/package.json'], env: {}};

	/** code **/
	module.exports = (function() {
	return {
		"name": "recursive-merge",
		"description": "Recursive merge tool for arrays and objects",
		"version": "1.1.0",
		"author": {
			"name": "David Kudera",
			"email": "sakren@gmail.com"
		},
		"keywords": [
			"merge",
			"recursive",
			"browser",
			"array",
			"object"
		],
		"license": "MIT",
		"repository": {
			"type": "git",
			"url": "git@github.com:sakren/node-recursive-merge.git"
		},
		"engines": {
			"node": "*"
		},
		"main": "./lib/Merge.js",
		"devDependencies": {
			"should": "~1.2.2",
			"chai": "~1.8.1",
			"mocha": "~1.14.0"
		},
		"scripts": {
			"test": "cd ./test; echo \"Testing in node:\"; mocha ./node/index.js --reporter spec; cd ./browser; simq build; echo \"Testing in browser:\"; mocha-phantomjs ./index.html;"
		}
	}
	}).call(this);
	

}
});
require.version = '5.1.1';
delete require.__setStats;

/** run section **/

/** /test/browser/tests/Merge **/
require('/test/browser/tests/Merge');