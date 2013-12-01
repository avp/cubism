/**
 * obstacle.js - The enemies of the game.
 */

define(function(require) {
  'use strict';

  var C = require('constants');
  var Util = require('util');

  function Obstacle(scene) {
    var cubeGeo = new THREE.CubeGeometry(5, 5, 5);
    var cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000});
    cubeMat.side = THREE.DoubleSide;
    var cube = new THREE.Mesh(cubeGeo, cubeMat);

    var x = Util.random(-C.ARENA_SIZE, C.ARENA_SIZE);
    var y = Util.random(-C.ARENA_SIZE, C.ARENA_SIZE);

    cube.position.set(x, y, 0);
    scene.add(cube);
    this.mesh = cube;

    this.direction = Math.random() > 0.5 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  }

  Obstacle.prototype.move = function() {
    this.mesh.translateOnAxis(this.direction, C.MOVE_SPEED);
    if (this.mesh.position.x < -C.ARENA_SIZE || this.mesh.position.x > C.ARENA_SIZE) {
      this.direction.negate();
    }
    if (this.mesh.position.y < -C.ARENA_SIZE || this.mesh.position.y > C.ARENA_SIZE) {
      this.direction.negate();
    }
  };

  return Obstacle;
});
