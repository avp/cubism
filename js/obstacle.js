/**
 * obstacle.js - The enemies of the game.
 */

import * as C from './constants.js';
import Cube from './cube.js';
import { random } from './util.js';

export default class Obstacle extends Cube {
  constructor(scene) {
    const x = random(-C.ARENA_SIZE, C.ARENA_SIZE);
    const y = random(-C.ARENA_SIZE, C.ARENA_SIZE);
    super(scene, x, y, 0, { color: 0xaa0000 });
    this.direction = new THREE.Vector3(
      Math.random(),
      Math.random(),
      0
    ).normalize();
  }

  move(elapsed) {
    this.mesh.translateOnAxis(this.direction, C.MOVE_SPEED * elapsed);
    if (
      this.mesh.position.x < -C.ARENA_SIZE ||
      this.mesh.position.x > C.ARENA_SIZE
    ) {
      this.direction.x *= -1;
    }
    if (
      this.mesh.position.y < -C.ARENA_SIZE ||
      this.mesh.position.y > C.ARENA_SIZE
    ) {
      this.direction.y *= -1;
    }
  }
}
