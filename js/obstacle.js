/**
 * obstacle.js - The enemies of the game.
 */

import * as C from './constants.js';
import {random} from './util.js';

class Obstacle {
  constructor(scene) {
    const cubeGeo = new THREE.CubeGeometry(C.CUBE_SIZE, C.CUBE_SIZE, C.CUBE_SIZE);
    const cubeMat = new THREE.MeshLambertMaterial({color: 0xaa0000});
    cubeMat.side = THREE.DoubleSide;
    const cube = new THREE.Mesh(cubeGeo, cubeMat);

    const x = random(-C.ARENA_SIZE, C.ARENA_SIZE);
    const y = random(-C.ARENA_SIZE, C.ARENA_SIZE);

    cube.position.set(x, y, 0);
    scene.add(cube);
    this.mesh = cube;

    this.direction = new THREE.Vector3(Math.random(), Math.random(), 0).normalize();
  }

  move() {
    this.mesh.translateOnAxis(this.direction, C.MOVE_SPEED);
    if (this.mesh.position.x < -C.ARENA_SIZE || this.mesh.position.x > C.ARENA_SIZE) {
      this.direction.setX(-this.direction.x);
    }
    if (this.mesh.position.y < -C.ARENA_SIZE || this.mesh.position.y > C.ARENA_SIZE) {
      this.direction.setY(-this.direction.y);
    }
  };
}

export default Obstacle;
