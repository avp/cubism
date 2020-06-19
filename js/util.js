/**
 * util.js - Utility functions
 */

export function random(min, max) {
  min = min || 0;
  max = max || 1;
  const diff = max - min;
  return (Math.random() * diff) + min;
};
