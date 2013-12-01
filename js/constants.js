/**
 * constants.js - Game-level constants.
 */

define(function(require) {
  'use strict';

  var C = {};

  C.TURN_RATE = 0.06;
  C.MOVE_SPEED = 1;
  C.CUBE_SIZE = 5;

  C.ARENA_SIZE = 100;
  C.FLOOR_SIZE = 2 * C.ARENA_SIZE + C.CUBE_SIZE;

  return C;
});
