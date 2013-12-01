/**
 * cube.js - A basic cube object
 */

define(function(require) {
  'use strict';

  var C = require('constants');

  function Cube(scene, x, y, z, size, params) {
    size = size || C.CUBE_SIZE;
    var cubeGeo = new THREE.CubeGeometry(size, size, size);
    var cubeMat = new THREE.MeshLambertMaterial(params);
    cubeMat.side = THREE.DoubleSide;
    var cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(x, y, z);
    scene.add(cube);
    this.mesh = cube;
  }

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

  return Cube;
});
