/**
 * obstacle.js - The enemies of the game.
 */

define(function(require) {
  'use strict';

  var C = require('constants');
  var Util = require('util');

  function Obstacle(scene) {
    var cubeGeo = new THREE.CubeGeometry(C.CUBE_SIZE, C.CUBE_SIZE, C.CUBE_SIZE);
    var cubeMat = new THREE.MeshLambertMaterial({color: 0xaa0000});
    cubeMat.side = THREE.DoubleSide;
    var cube = new THREE.Mesh(cubeGeo, cubeMat);

    var x = Util.random(-C.ARENA_SIZE, C.ARENA_SIZE);
    var y = Util.random(-C.ARENA_SIZE, C.ARENA_SIZE);

    cube.position.set(x, y, 0);
    scene.add(cube);
    this.mesh = cube;

    this.direction = new THREE.Vector3(Math.random(), Math.random(), 0).normalize();
  }

  Obstacle.prototype.move = function() {
    this.mesh.translateOnAxis(this.direction, C.MOVE_SPEED);
    if (this.mesh.position.x < -C.ARENA_SIZE || this.mesh.position.x > C.ARENA_SIZE) {
      this.direction.setX(-this.direction.x);
    }
    if (this.mesh.position.y < -C.ARENA_SIZE || this.mesh.position.y > C.ARENA_SIZE) {
      this.direction.setY(-this.direction.y);
    }
  };

  return Obstacle;
});
