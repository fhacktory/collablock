'use strict';

var fs = require('fs');
var path = require('path');

var LEVELS_PATH = path.join(__dirname, '..', 'levels');


module.exports = fs.readdirSync(LEVELS_PATH)
  .reduce(function(acc, filename) {
    acc[filename] = path.join(LEVELS_PATH, filename);
    return acc;
  }, {});
