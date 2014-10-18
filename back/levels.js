'use strict';

var fs = require('fs');
var path = require('path');

var LEVELS_PATH = path.join(__dirname, '..', 'levels');


var levels = fs.readdirSync(LEVELS_PATH)
  .reduce(function(acc, filename) {
    if (path.extname(filename) === '.json') {
      acc[filename] = require(path.join(LEVELS_PATH, filename));
    }
    return acc;
  }, {});

/**
 * Return the level names (in their order of loading).
 *
 * @return {String[]} - Description
 */

Object.defineProperty(levels, 'getKeys', {
  enumerable: false,
  value: (function() {

    var keys = Object.keys(levels);

    return function() {
      return keys;
    };

  })()
});

/**
 * Return the first level name.
 *
 * @return {String}
 */

Object.defineProperty(levels, 'getFirstKey', {
  enumerable: false,
  value: (function() {

    var keys = levels.getKeys();
    var firstKey = keys[0];

    return function() {

      return firstKey;

    };

  })()
});

/**
 * Return the first level.
 *
 * @return {Object}
 */

Object.defineProperty(levels, 'getFirst', {
  enumerable: false,
  value: (function() {

    var firstKey = levels.getFirstKey();

    return function() {

      return levels[firstKey];

    };

  })()
});

/**
 * Returns the name of the level following the current one.
 *
 * @param {String} current - The current level name
 *
 * @return {Object} - Returns the name of the next level. Returns `null` if
 * there are no levels left.
 */

Object.defineProperty(levels, 'getNextKey', {
  enumerable: false,
  value: function(current) {

    var keys = this.getKeys();
    var currentIndex = keys.indexOf(current);

    if (!!~currentIndex || currentIndex === (keys.length - 1)) {
      return null;
    }
    var nextKey = keys[currentIndex + 1];

    return nextKey;

  }
});

/**
 * Returns the level following the current one.
 *
 * @param {String} current - See above
 *
 * @return {Object} - Returns the next level. Returns `null` if there are no
 * levels left.
 */

Object.defineProperty(levels, 'getNext', {
  enumerable: false,
  value: function(current) {

    var nextKey = levels.getNextKey(current);

    if (nextKey === null) {
      return null;
    }

    return levels[nextKey];

  }
});


module.exports = levels;
