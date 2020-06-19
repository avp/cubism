/**
 * util.js - Utility functions
 */

const Util = {};

Util.random = function(min, max) {
  min = min || 0;
  max = max || 1;
  var diff = max - min;
  return (Math.random() * diff) + min;
};

export default Util;
