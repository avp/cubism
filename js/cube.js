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
   */
  Cube.prototype.intersects = function(other) {
    var c1 = {
      left: this.mesh.position.x,
      right: this.mesh.position.x + this.mesh.geometry.width,
      bottom: this.mesh.position.y,
      top: this.mesh.position.y + this.mesh.geometry.height
    };
    var c2 = {
      left: other.mesh.position.x,
      right: other.mesh.position.x + other.mesh.geometry.width,
      bottom: other.mesh.position.y,
      top: other.mesh.position.y + other.mesh.geometry.height
    };
    return !(c1.left > c2.right ||
             c2.left > c1.right ||
             c1.bottom > c2.top ||
             c2.bottom > c1.top);
  };

  return Cube;
});
