'use strict';

var _ = require('lodash');

var onecolor = require('onecolor');


var utils = {};

/**
 * @const
 * @type {Number}
 */

var PHI = (1 + Math.sqrt(5)) / 2;

/**
 * Compute the equivalent between 0 and 1 for the given number.
 *
 * @param {Number} number
 *
 * @return {Number}
 */

utils.getNumberBetween0And1 = function(number) {

  var numberTimesPhi = number * PHI;
  return numberTimesPhi - Math.floor(numberTimesPhi);

};

/**
 * Compute a random color for the given number.
 */

utils.getColorFromNumber = _.memoize(function(number) {

  var goldenRatioConjugate = utils.getNumberBetween0And1(number);

  var hue = (Math.random() + goldenRatioConjugate) % 1;
  var saturation = 0.5;
  var value = 0.95;

  var color = new onecolor.HSV(hue, saturation, value);
  return color.hex();

});


module.exports = utils;
