/**
 * game.js: Main game code
 */

define(function(require) {
  'use strict';

  var Game = {};

  Game.start = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    Game.scene = new THREE.Scene();
    Game.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100000);
    Game.camera.position.set(20, 20, 20);
    Game.camera.lookAt(new THREE.Vector3(0, 0, 0));

    Game.renderer = new THREE.WebGLRenderer();
    Game.renderer.setSize(w, h);
    Game.renderer.shadowMapEnabled = true;

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position = new THREE.Vector3(40, 30, 20);
    spotLight.lookAt(new THREE.Vector3(0, 0, 0));
    spotLight.shadowmapWidth = spotLight.shadowMapHeight = 4096;
    Game.scene.add(spotLight);

    Game.scene.add(new THREE.AmbientLight(0x222222));

    var cubeGeo = new THREE.CubeGeometry(5, 5, 5);
    var cubeMat = new THREE.MeshLambertMaterial({color: 0x007700});
    cubeMat.side = THREE.DoubleSide;
    var cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.castShadow = cube.recieveShadow = true;
    cube.position.set(0, 0, 0);
    Game.scene.add(cube);
    Game.cube = cube;

    document.getElementById('webgl').appendChild(Game.renderer.domElement);
    requestAnimationFrame(_.bind(Game.render, Game));
  };

  Game.render = function() {
    Game.renderer.render(Game.scene, Game.camera);
    Game.cube.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
    requestAnimationFrame(_.bind(Game.render, Game));
  };

  return Game;
});
