/**
 * cube.js - A basic cube object
 */

import * as C from "./constants.js";
import { random } from "./util.js";

const ARENA_MIN = new THREE.Vector3(-C.ARENA_SIZE, -C.ARENA_SIZE, 0);
const ARENA_MAX = new THREE.Vector3(C.ARENA_SIZE, C.ARENA_SIZE, 0);
const UP_VEC = new THREE.Vector3(0, 0, 1);

export default class Cube {
  constructor(scene, x, y, z, params) {
    const size = C.CUBE_SIZE;
    const cubeGeo = new THREE.CubeGeometry(size, size, size);
    const cubeMat = new THREE.MeshLambertMaterial(params);
    cubeMat.side = THREE.DoubleSide;
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(x, y, z);
    scene.add(cube);
    this.mesh = cube;
  }

  /**
   * Moves this cube to be inside the arena.
   */
  clamp() {
    this.mesh.position.clamp(ARENA_MIN, ARENA_MAX);
  }

  turnLeft(elapsed) {
    this.mesh.rotateOnAxis(UP_VEC, C.TURN_RATE * elapsed);
    this.clamp();
  }

  turnRight(elapsed) {
    this.mesh.rotateOnAxis(UP_VEC, -C.TURN_RATE * elapsed);
    this.clamp();
  }

  moveForward(elapsed) {
    this.mesh.translateOnAxis(this.mesh.up, C.MOVE_SPEED * elapsed);
    this.clamp();
  }

  moveBackward(elapsed) {
    this.mesh.translateOnAxis(this.mesh.up, -C.MOVE_SPEED * elapsed);
    this.clamp();
  }

  /**
   * Moves the cube to a random space in the C.ARENA_SIZE.
   */
  teleport() {
    const x = random(-C.ARENA_SIZE, C.ARENA_SIZE);
    const y = random(-C.ARENA_SIZE, C.ARENA_SIZE);
    this.mesh.position.set(x, y, 0);
  }

  /**
   * Returns true if this cube intersects with other, and false otherwise.
   * FIXME: Do this correctly, this works OK for now.
   */
  intersects(other) {
    const c1 = {
      left: this.mesh.position.x,
      right: this.mesh.position.x + this.mesh.geometry.width,
      bottom: this.mesh.position.y,
      top: this.mesh.position.y + this.mesh.geometry.height,
    };
    const c2 = {
      left: other.mesh.position.x,
      right: other.mesh.position.x + other.mesh.geometry.width,
      bottom: other.mesh.position.y,
      top: other.mesh.position.y + other.mesh.geometry.height,
    };
    return !(
      c1.left > c2.right ||
      c2.left > c1.right ||
      c1.bottom > c2.top ||
      c2.bottom > c1.top
    );
  }
}
