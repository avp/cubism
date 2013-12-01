/**
 * cube.js - A basic cube object
 */

define(function(require) {
  function Cube(scene, x, y, z, size, params) {
    size = size || 5;
    var cubeGeo = new THREE.CubeGeometry(size, size, size);
    var cubeMat = new THREE.MeshLambertMaterial(params);
    cubeMat.side = THREE.DoubleSide;
    var cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.castShadow = cube.receiveShadow = true;
    cube.position.set(x, y, z);
    scene.add(cube);
    this.mesh = cube;
  }

  Cube.prototype.cameraPosition = function() {
    var pos = this.mesh.position;
    var up = this.mesh.up.clone();
    var p = up.setLength(30).negate().add(pos).add(new THREE.Vector3(0, 0, 30));
    return p;
  };

  return Cube;
});
