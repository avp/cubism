/**
 * game.js: Main game code
 */

define(function(require) {
  'use strict';

  var C = require('constants');

  var Game = {
    keysDown: {}
  };

  Game.start = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    Game.scene = new THREE.Scene();
    Game.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100000);
    Game.camera.position.set(20, 80, 20);
    Game.camera.lookAt(new THREE.Vector3(0, 0, 0));

    Game.renderer = new THREE.WebGLRenderer();
    Game.renderer.setSize(w, h);
    Game.renderer.shadowMapEnabled = true;

    var light = new THREE.SpotLight(0xffffff);
    light.castShadow = true;
    light.position = new THREE.Vector3(40, 100, 20);
    light.intensity = 2;
    light.lookAt(new THREE.Vector3(0, 0, 0));
    light.shadowmapWidth = light.shadowMapHeight = 4096;
    light.angle = Math.PI / 2;
    Game.scene.add(light);
    Game.spotLight = light;

    var dirLight = new THREE.SpotLight(0xffffff);
    dirLight.position = new THREE.Vector3(0, 1000, 0);
    dirLight.intensity = 3;
    dirLight.lookAt(new THREE.Vector3(0, 0, 0));
    Game.scene.add(dirLight);

    Game.scene.add(new THREE.AmbientLight(0x222222));

    var cubeGeo = new THREE.CubeGeometry(5, 5, 5);
    var cubeMat = new THREE.MeshLambertMaterial({color: 0x007700});
    cubeMat.side = THREE.DoubleSide;
    var cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.castShadow = cube.receiveShadow = true;
    cube.position.set(0, 2.5, 0);
    cube.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    Game.scene.add(cube);
    Game.cube = cube;

    var floorGeo = new THREE.CubeGeometry(10000, 0.1, 10000);
    var floorMat = new THREE.MeshLambertMaterial({color: 0x666666});
    floorMat.side = THREE.DoubleSide;
    var floor = new THREE.Mesh(floorGeo, floorMat);
    floor.receiveShadow = true;
    floor.position.set(0, 0, 0);
    Game.scene.add(floor);

    window.onkeydown = function(k) {
      console.log(k.which);
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
      Game.cube.rotateOnAxis(new THREE.Vector3(0, 0, 1), C.TURN_RATE);
    }
    if (Game.keysDown[68]) {
      Game.cube.rotateOnAxis(new THREE.Vector3(0, 0, 1), -C.TURN_RATE);
    }
    if (Game.keysDown[87]) {
      Game.cube.translateOnAxis(Game.cube.up, C.MOVE_SPEED);
    }

    Game.spotLight.lookAt(Game.cube.position);
    Game.renderer.render(Game.scene, Game.camera);
    requestAnimationFrame(_.bind(Game.render, Game));
  };

  return Game;
});
