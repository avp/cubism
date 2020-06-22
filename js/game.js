/**
 * game.js: Main game code
 */

import * as C from './constants.js';
import Cube from './cube.js';
import Obstacle from './obstacle.js';

const Game = {
  keysDown: {},
  score: 0,
  obstacles: [],
  scene: null,
  renderer: null,
  prevTime: null,
};

function initLights() {
  const positions = [
    new THREE.Vector3(1000, 1000, 10000),
    new THREE.Vector3(1000, -1000, 10000),
    new THREE.Vector3(-1000, 1000, 10000),
    new THREE.Vector3(-1000, -1000, 10000),
  ];
  const origin = new THREE.Vector3(0, 0, 0);
  for (const pos of positions) {
    const dirLight = new THREE.SpotLight(0xffffff);
    dirLight.position = pos;
    dirLight.intensity = 3;
    dirLight.lookAt(origin);
    Game.scene.add(dirLight);
  }
  Game.scene.add(new THREE.AmbientLight(0x111111));
}

function reset() {
  for (const obs of Game.obstacles) {
    obs.remove();
  }
  Game.obstacles = [];
  Game.keysDown = {};
  Game.hero.mesh.position.set(0, 0, 0);
  Game.target.teleport();
  Game.score = 0;
  document.getElementById('score').innerHTML = Game.score;
}

function render(curTime) {
  if (Game.prevTime === null) {
    Game.prevTime = curTime;
  }

  const elapsed = curTime - Game.prevTime;
  Game.prevTime = curTime;

  if (Game.keysDown[C.KEY_LEFT] || Game.keysDown[37]) {
    Game.hero.turnLeft(elapsed);
  }
  if (Game.keysDown[C.KEY_RIGHT] || Game.keysDown[39]) {
    Game.hero.turnRight(elapsed);
  }
  if (Game.keysDown[C.KEY_FORWARD] || Game.keysDown[38]) {
    Game.hero.moveForward(elapsed);
  }
  if (Game.keysDown[C.KEY_BACKWARD] || Game.keysDown[40]) {
    Game.hero.moveBackward(elapsed);
  }

  for (const obstacle of Game.obstacles) {
    obstacle.move(elapsed);
    if (Game.hero.intersects(obstacle)) {
      alert(`Game Over!\nScore: ${Game.score}`);
      reset();
    }
  }

  Game.nav.position.x = Game.hero.mesh.position.x;
  Game.nav.position.y = Game.hero.mesh.position.y;
  Game.nav.lookAt(Game.target.mesh.position.clone().setZ(50));
  Game.nav.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);

  if (Game.hero.intersects(Game.target)) {
    Game.target.teleport();
    Game.score++;
    document.getElementById('score').innerHTML = Game.score;
    Game.obstacles.push(new Obstacle(Game.scene));
  }

  Game.renderer.render(Game.scene, Game.camera);
  requestAnimationFrame(render);
}

function start() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  Game.scene = new THREE.Scene();
  Game.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100000);
  Game.camera.position.set(0, -80, 80);
  Game.camera.up.set(0, 1, 0);
  Game.camera.lookAt(new THREE.Vector3(0, 0, 0));

  Game.renderer = new THREE.WebGLRenderer();
  Game.renderer.setSize(w, h);

  initLights();

  Game.hero = new Cube(Game.scene, 0, 0, 0, { color: 0x007700 });
  Game.hero.mesh.add(Game.camera);

  Game.target = new Cube(Game.scene, 0, 0, 0, { color: 0x000088 });
  Game.target.teleport();

  const navGeo = new THREE.CylinderGeometry(0, 1, 10, 20, false);
  const navMat = new THREE.MeshPhongMaterial({ color: 0x000088 });
  const nav = new THREE.Mesh(navGeo, navMat);
  nav.position.set(0, 0, 50);
  nav.lookAt(Game.target.mesh.position.clone().setZ(50));
  nav.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  Game.scene.add(nav);
  Game.nav = nav;

  const floorGeo = new THREE.CubeGeometry(C.FLOOR_SIZE, C.FLOOR_SIZE, 0.1);
  const floorMat = new THREE.MeshLambertMaterial({ color: 0x010101 });
  floorMat.side = THREE.DoubleSide;
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.set(0, 0, -2.5);
  Game.scene.add(floor);

  window.onkeydown = function (k) {
    Game.keysDown[k.which] = true;
  };
  window.onkeyup = function (k) {
    Game.keysDown[k.which] = false;
  };

  document.getElementById('webgl').appendChild(Game.renderer.domElement);
  reset();
  requestAnimationFrame(render);
}

start();
