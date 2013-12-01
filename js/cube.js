/**
 * cube.js - A basic cube object
 */

define(function(require) {
  'use strict';

  var C = require('constants');
  var Util = require('util');

  function Cube(scene, x, y, z, params) {
    var size = C.CUBE_SIZE;
    var cubeGeo = new THREE.CubeGeometry(size, size, size);
    var cubeMat = new THREE.MeshLambertMaterial(params);
    cubeMat.side = THREE.DoubleSide;
    var cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(x, y, z);
    scene.add(cube);
    this.mesh = cube;
  }

  /**
   * Moves this cube to be inside the arena.
   */
  Cube.prototype.clamp = function() {
    var min = new THREE.Vector3(-C.ARENA_SIZE, -C.ARENA_SIZE, 0);
    var max = new THREE.Vector3(C.ARENA_SIZE, C.ARENA_SIZE, 0);
    this.mesh.position.clamp(min, max);
  };

  Cube.prototype.turnLeft = function() {
    this.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), C.TURN_RATE);
    this.clamp();
  };

  Cube.prototype.turnRight = function() {
    this.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), -C.TURN_RATE);
    this.clamp();
  };

  Cube.prototype.moveForward = function() {
    this.mesh.translateOnAxis(this.mesh.up, C.MOVE_SPEED);
    this.clamp();
  };

  Cube.prototype.moveBackward = function() {
    this.mesh.translateOnAxis(this.mesh.up, -C.MOVE_SPEED);
    this.clamp();
  };

  /**
   * Moves the cube to a random space in the C.ARENA_SIZE.
   */
  Cube.prototype.teleport = function() {
    var x = Util.random(-C.ARENA_SIZE, C.ARENA_SIZE);
    var y = Util.random(-C.ARENA_SIZE, C.ARENA_SIZE);
    this.mesh.position.set(x, y, 0);
  };

  /**
   * Returns true if this cube intersects with other, and false otherwise.
   * REQUIRES: the size of both cubes is C.CUBE_SIZE
   */
  Cube.prototype.intersects = function(other) {
    var pos1 = this.mesh.position;
    var pos2 = other.mesh.position;
    return pos1.distanceTo(pos2) < (Math.sqrt(2) * C.CUBE_SIZE / 1.5);
  };

  return Cube;
});
