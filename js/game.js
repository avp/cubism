/**
 * game.js: Main game code
 */

define(function(require) {
  'use strict';

  var C = require('constants');
  var Cube = require('cube');
  var Obstacle = require('obstacle');

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

    Game.obstacles = [];
    for (var i = 0; i < 4; i++) {
      Game.obstacles.push(new Obstacle(Game.scene));
    }

    var floorGeo = new THREE.CubeGeometry(2*C.ARENA_SIZE+5, 2*C.ARENA_SIZE+5, 0.1);
    var floorMat = new THREE.MeshLambertMaterial({color: 0x010101});
    floorMat.side = THREE.DoubleSide;
    var floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, 0, -2.5);
    Game.scene.add(floor);


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
      Game.cube.turnLeft();
    }
    if (Game.keysDown[68]) {
      Game.cube.turnRight();
    }
    if (Game.keysDown[87]) {
      Game.cube.moveForward();
    }
    if (Game.keysDown[83]) {
      Game.cube.moveBackward();
    }

    _.forEach(Game.obstacles, function(obstacle) {
      obstacle.move();
    });

    Game.renderer.render(Game.scene, Game.camera);
    requestAnimationFrame(_.bind(Game.render, Game));
  };

  return Game;
});
