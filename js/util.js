/**
 * util.js - Utility functions
 */

define(function(require) {
  'use strict';

  var Util = {};

  Util.random = function(min, max) {
    min = min || 0;
    max = max || 1;
    var diff = max - min;
    return (Math.random() * diff) + min;
  };

  return Util;
});
