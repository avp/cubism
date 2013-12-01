/**
 * game.js: Main game code
 */

define(function(require) {
  'use strict';

  var C = require('constants');
  var Cube = require('cube');
  var Obstacle = require('obstacle');

  var Game = {
    keysDown: {},
    score: 0,
    obstacles: []
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
    Game.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100000);
    Game.camera.position.set(0, -90, 60);
    Game.camera.up.set(0, 1, 0);
    Game.camera.lookAt(new THREE.Vector3(0, 0, 0));

    Game.renderer = new THREE.WebGLRenderer();
    Game.renderer.setSize(w, h);

    initLights();

    Game.hero = new Cube(Game.scene, 0, 0, 0, {color: 0x007700});
    Game.hero.mesh.add(Game.camera);

    Game.target = new Cube(Game.scene, 0, 0, 0, {color: 0x000088});
    Game.target.teleport();

    var floorGeo = new THREE.CubeGeometry(C.FLOOR_SIZE, C.FLOOR_SIZE, 0.1);
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
      Game.hero.turnLeft();
    }
    if (Game.keysDown[68]) {
      Game.hero.turnRight();
    }
    if (Game.keysDown[87]) {
      Game.hero.moveForward();
    }
    if (Game.keysDown[83]) {
      Game.hero.moveBackward();
    }

    _.forEach(Game.obstacles, function(obstacle) {
      obstacle.move();
      if (Game.hero.intersects(obstacle)) {
        alert('Game Over!\nScore: ' + Game.score);
        _.forEach(Game.obstacles, function(obstacle) {
          Game.scene.remove(obstacle.mesh);
        });
        Game.obstacles = [];
        Game.keysDown = {};
        Game.hero.mesh.position.set(0, 0, 0);
        Game.target.teleport();
        Game.score = 0;
        document.getElementById('score').innerHTML = Game.score;
      }
    });

    if (Game.hero.intersects(Game.target)) {
      Game.target.teleport();
      Game.score++;
      document.getElementById('score').innerHTML = Game.score;
      Game.obstacles.push(new Obstacle(Game.scene));
    }

    Game.renderer.render(Game.scene, Game.camera);
    requestAnimationFrame(_.bind(Game.render, Game));
  };

  return Game;
});
