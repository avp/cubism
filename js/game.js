/**
 * game.js: Main game code
 */

define(function(require) {
  'use strict';

  var C = require('constants');
  var Cube = require('cube');

  var Game = {
    keysDown: {}
  };

  var initLights = function() {
    var dirLight;
    dirLight = new THREE.SpotLight(0xffffff);
    dirLight.position = new THREE.Vector3(1000, 1000, 10000);
    dirLight.intensity = 3;
    dirLight.lookAt(new THREE.Vector3(0, 0, 0));
    Game.scene.add(dirLight);
    dirLight = new THREE.SpotLight(0xffffff);
    dirLight.position = new THREE.Vector3(1000, -1000, 10000);
    dirLight.intensity = 3;
    dirLight.lookAt(new THREE.Vector3(0, 0, 0));
    Game.scene.add(dirLight);
    dirLight = new THREE.SpotLight(0xffffff);
    dirLight.position = new THREE.Vector3(-1000, 1000, 10000);
    dirLight.intensity = 3;
    dirLight.lookAt(new THREE.Vector3(0, 0, 0));
    Game.scene.add(dirLight);
    dirLight = new THREE.SpotLight(0xffffff);
    dirLight.position = new THREE.Vector3(-1000, -1000, 10000);
    dirLight.intensity = 3;
    dirLight.lookAt(new THREE.Vector3(0, 0, 0));
    Game.scene.add(dirLight);

    Game.scene.add(new THREE.AmbientLight(0x111111));
  };

  Game.start = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    Game.scene = new THREE.Scene();
    Game.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100000);
    Game.camera.position.set(0, -70, 20);
    Game.camera.up.set(0, 1, 0);
    Game.camera.lookAt(new THREE.Vector3(0, 0, 0));

    Game.renderer = new THREE.WebGLRenderer();
    Game.renderer.setSize(w, h);

    initLights();

    Game.cube = new Cube(Game.scene, 0, 0, 0, 5, {color: 0x007700});
    Game.cube.mesh.add(Game.camera);

    new Cube(Game.scene, 20, 20, 0, 5, {color: 0xff0000});
    new Cube(Game.scene, -20, 20, 0, 5, {color: 0xff0000});
    new Cube(Game.scene, 20, -20, 0, 5, {color: 0xff0000});
    new Cube(Game.scene, -20, -20, 0, 5, {color: 0xff0000});

    window.onkeydown = function(k) {
      Game.keysDown[k.which] = true;
    };
    window.onkeyup = function(k) {
      Game.keysDown[k.which] = false;
    };

    document.getElementById('webgl').appendChild(Game.renderer.domElement);
    requestAnimationFrame(_.bind(Game.render, Game));
  };

  Game.render = function() {
    if (Game.keysDown[65]) {
      Game.cube.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), C.TURN_RATE);
    }
    if (Game.keysDown[68]) {
      Game.cube.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), -C.TURN_RATE);
    }
    if (Game.keysDown[87]) {
      Game.cube.mesh.translateOnAxis(Game.cube.mesh.up, C.MOVE_SPEED);
    }
    if (Game.keysDown[83]) {
      Game.cube.mesh.translateOnAxis(Game.cube.mesh.up, -C.MOVE_SPEED);
    }

    Game.renderer.render(Game.scene, Game.camera);
    requestAnimationFrame(_.bind(Game.render, Game));
  };

  return Game;
});
